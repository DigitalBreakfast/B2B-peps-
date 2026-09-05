/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// In-memory rate limiting store for serverless instance lifetime
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIp);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
  if (typeof timer === "object" && timer && "unref" in timer) {
    timer.unref();
  }
}

// Escape HTML special characters to prevent email HTML injection attacks
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const SERVICE_LABELS: Record<string, string> = {
  pricing: "Request Pricing",
  catalogue: "Request Product Catalogue",
  meeting: "Request a Meeting",
  general: "General Enquiry / Other",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed. Only POST requests are accepted.",
    });
  }

  try {
    // 2. Extract Client IP for rate limiting
    const forwarded = req.headers["x-forwarded-for"];
    const clientIp = typeof forwarded === "string" 
      ? forwarded.split(",")[0].trim() 
      : req.socket?.remoteAddress || "unknown";

    if (isRateLimited(clientIp)) {
      console.warn(`[Contact API] Rate limit exceeded for IP: ${clientIp}`);
      return res.status(429).json({
        success: false,
        error: "Too many enquiries submitted from your network. Please wait a few minutes or contact us directly at info@b2bpeps.com.",
      });
    }

    // 3. Parse Body safely
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    const {
      name,
      company,
      email,
      whatsapp,
      telegram,
      selectedHelp = [],
      monthlyRequirement,
      message,
      preferredDate,
      preferredTime,
      userTimezone,
      reference: clientRef,
      b2b_website_hp, // Honeypot
    } = body;

    // 4. Anti-spam Honeypot Check
    // If the hidden field is filled, silently discard without notifying the bot
    if (b2b_website_hp && String(b2b_website_hp).trim().length > 0) {
      console.warn(`[Contact API] Honeypot triggered from IP: ${clientIp}`);
      // Return synthetic success so spambots don't adapt
      return res.status(200).json({
        success: true,
        reference: clientRef || `ENQ-${Math.floor(100000 + Math.random() * 900000)}`,
        message: "Enquiry submitted successfully.",
      });
    }

    // 5. Server-Side Validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid contact name (2-100 characters).",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim()) || email.trim().length > 150) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid business email address.",
      });
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedCompany = typeof company === "string" ? company.trim().slice(0, 150) : "";
    const sanitizedWhatsapp = typeof whatsapp === "string" ? whatsapp.trim().slice(0, 50) : "";
    const sanitizedTelegram = typeof telegram === "string" ? telegram.trim().slice(0, 50) : "";
    const sanitizedMessage = typeof message === "string" ? message.trim().slice(0, 5000) : "";
    const sanitizedMonthly = typeof monthlyRequirement === "string" ? monthlyRequirement.trim().slice(0, 100) : "";
    const sanitizedTimezone = typeof userTimezone === "string" ? userTimezone.trim().slice(0, 100) : "UTC";
    const sanitizedDate = typeof preferredDate === "string" ? preferredDate.trim().slice(0, 30) : "";
    const sanitizedTime = typeof preferredTime === "string" ? preferredTime.trim().slice(0, 20) : "";
    const reference = typeof clientRef === "string" && clientRef.startsWith("ENQ-")
      ? clientRef.slice(0, 20)
      : `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const helpArray = Array.isArray(selectedHelp) 
      ? selectedHelp.map((h) => String(h).trim()).filter(Boolean)
      : [];
    const isMeetingSelected = helpArray.includes("meeting");
    const helpLabels = helpArray.map((id) => SERVICE_LABELS[id] || id);
    const serviceSummary = helpLabels.length > 0 ? helpLabels.join(", ") : "General Enquiry";

    // 6. Check Resend API Key
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Contact API Error] RESEND_API_KEY is not defined in environment variables.");
      
      // In local dev without API key, return a helpful development fallback
      if (process.env.NODE_ENV !== "production") {
        console.info("[Contact API] Local dev simulation: inquiry received for", sanitizedEmail);
        return res.status(200).json({
          success: true,
          reference,
          message: "Enquiry logged (dev simulation). Add RESEND_API_KEY to send real emails.",
        });
      }

      return res.status(503).json({
        success: false,
        error: "Our automated dispatch service is temporarily undergoing maintenance. Please email our team directly at info@b2bpeps.com.",
      });
    }

    // 7. Initialize Resend SDK
    const resend = new Resend(apiKey);

    const toEmail = process.env.CONTACT_TO_EMAIL || "info@b2bpeps.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "B2B Peps Inquiries <inquiries@b2bpeps.com>";
    const subjectCompany = sanitizedCompany ? `${sanitizedCompany} - ` : "";
    const emailSubject = `[B2B Inquiry ${reference}] ${subjectCompany}${sanitizedName} (${serviceSummary})`;

    // 8. Build High-Precision HTML Email Template
    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(emailSubject)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0d0e; color: #e4e4e7; margin: 0; padding: 24px 16px; }
    .container { max-width: 620px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(180deg, #18181b 0%, #131416 100%); padding: 28px 24px; border-bottom: 1px solid #27272a; }
    .brand { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #34d399; margin-bottom: 6px; }
    .title { font-size: 22px; font-weight: 700; color: #ffffff; margin: 0; }
    .ref-badge { display: inline-block; background-color: rgba(52, 211, 153, 0.12); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); padding: 4px 10px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-top: 10px; }
    .content { padding: 24px; }
    .section-title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #a1a1aa; border-bottom: 1px solid #27272a; padding-bottom: 8px; margin: 20px 0 12px 0; }
    .section-title:first-child { margin-top: 0; }
    .field-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #202024; font-size: 14px; }
    .field-label { color: #71717a; width: 140px; }
    .field-value { color: #f4f4f5; font-weight: 500; flex: 1; text-align: right; word-break: break-word; }
    .service-chip { display: inline-block; background: #27272a; border: 1px solid #3f3f46; color: #e4e4e7; padding: 4px 10px; border-radius: 6px; font-size: 12px; margin: 2px; }
    .meeting-box { background: rgba(52, 211, 153, 0.06); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 8px; padding: 14px 16px; margin: 12px 0; }
    .message-box { background: #121214; border: 1px solid #27272a; border-radius: 8px; padding: 16px; color: #e4e4e7; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
    .footer { background-color: #121214; padding: 20px 24px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; text-align: center; }
    .actions { text-align: center; margin: 24px 0 8px 0; }
    .reply-btn { display: inline-block; background-color: #34d399; color: #09090b; font-weight: 600; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">B2B Peps | Global Procurement Portal</div>
      <h1 class="title">New Client Enquiry Received</h1>
      <div class="ref-badge">Reference: ${escapeHtml(reference)}</div>
    </div>

    <div class="content">
      <div class="section-title">Client Information</div>
      <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td style="color:#71717a; font-size:13px; width:130px;">Name:</td>
          <td style="color:#ffffff; font-size:14px; font-weight:600;">${escapeHtml(sanitizedName)}</td>
        </tr>
        ${sanitizedCompany ? `
        <tr>
          <td style="color:#71717a; font-size:13px;">Company / Inst:</td>
          <td style="color:#ffffff; font-size:14px; font-weight:500;">${escapeHtml(sanitizedCompany)}</td>
        </tr>` : ""}
        <tr>
          <td style="color:#71717a; font-size:13px;">Business Email:</td>
          <td style="color:#34d399; font-size:14px; font-family:monospace;">
            <a href="mailto:${escapeHtml(sanitizedEmail)}" style="color:#34d399; text-decoration:none;">${escapeHtml(sanitizedEmail)}</a>
          </td>
        </tr>
        ${sanitizedWhatsapp ? `
        <tr>
          <td style="color:#71717a; font-size:13px;">WhatsApp:</td>
          <td style="color:#ffffff; font-size:14px;">${escapeHtml(sanitizedWhatsapp)}</td>
        </tr>` : ""}
        ${sanitizedTelegram ? `
        <tr>
          <td style="color:#71717a; font-size:13px;">Telegram:</td>
          <td style="color:#ffffff; font-size:14px;">${escapeHtml(sanitizedTelegram)}</td>
        </tr>` : ""}
        <tr>
          <td style="color:#71717a; font-size:13px;">Client Timezone:</td>
          <td style="color:#a1a1aa; font-size:13px; font-family:monospace;">${escapeHtml(sanitizedTimezone)}</td>
        </tr>
      </table>

      <div class="section-title">Requirements & Scope</div>
      <div style="margin: 8px 0 14px 0;">
        ${helpLabels.map((lbl) => `<span class="service-chip">${escapeHtml(lbl)}</span>`).join(" ")}
      </div>

      ${sanitizedMonthly ? `
      <div style="font-size:13px; color:#a1a1aa; margin-bottom:12px;">
        <strong style="color:#e4e4e7;">Approx. Monthly Requirement:</strong> ${escapeHtml(sanitizedMonthly)}
      </div>` : ""}

      ${isMeetingSelected ? `
      <div class="meeting-box">
        <div style="color:#34d399; font-weight:600; font-size:13px; margin-bottom:4px;">Requested Meeting Schedule</div>
        <div style="color:#ffffff; font-size:14px;">
          <strong>Date:</strong> ${escapeHtml(sanitizedDate || "TBD")} &nbsp;|&nbsp; 
          <strong>Time:</strong> ${escapeHtml(sanitizedTime || "14:00")} (${escapeHtml(sanitizedTimezone)})
        </div>
      </div>` : ""}

      <div class="section-title">Message / Specifications</div>
      <div class="message-box">
        ${sanitizedMessage ? escapeHtml(sanitizedMessage) : '<em style="color:#71717a;">No additional message specified.</em>'}
      </div>

      <div class="actions">
        <a href="mailto:${escapeHtml(sanitizedEmail)}?subject=Re:%20${encodeURIComponent(emailSubject)}" class="reply-btn">
          Reply Directly to ${escapeHtml(sanitizedName)}
        </a>
      </div>
    </div>

    <div class="footer">
      <div>Transmitted securely via B2B Peps Procurement Gateway</div>
      <div style="margin-top:4px;">IP: ${escapeHtml(clientIp)} &bull; ${new Date().toUTCString()}</div>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Plain text fallback
    const emailText = `
[B2B PEPS ENQUIRY ${reference}]
From: ${sanitizedName} <${sanitizedEmail}>
Company: ${sanitizedCompany || "N/A"}
WhatsApp: ${sanitizedWhatsapp || "N/A"}
Telegram: ${sanitizedTelegram || "N/A"}
Client Timezone: ${sanitizedTimezone}

Services Requested:
${helpLabels.join(", ") || "General Enquiry"}

Monthly Requirement: ${sanitizedMonthly || "Not specified"}

${isMeetingSelected ? `Meeting Requested: ${sanitizedDate || "TBD"} at ${sanitizedTime || "14:00"} (${sanitizedTimezone})\n` : ""}
Message / Specifications:
${sanitizedMessage || "None provided"}

---------------------------------------------------
Reference: ${reference}
Submission IP: ${clientIp}
Timestamp: ${new Date().toUTCString()}
Reply directly to: ${sanitizedEmail}
    `.trim();

    // 9. Dispatch via Resend SDK
    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: sanitizedEmail,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
      headers: {
        "X-Entity-Ref-ID": reference,
      },
    });

    if (sendResult.error) {
      console.error("[Resend Error Response]", sendResult.error.message, {
        code: sendResult.error.name,
      });
      return res.status(502).json({
        success: false,
        error: "Enquiry could not be dispatched via Resend. Please contact info@b2bpeps.com directly.",
      });
    }

    console.info(`[Contact API] Email successfully sent for ${reference} (Resend ID: ${sendResult.data?.id})`);

    // 10. Return success response
    return res.status(200).json({
      success: true,
      reference,
      message: "Your enquiry has been successfully transmitted.",
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Contact API Uncaught Error]", error?.message || error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while processing your enquiry. Please reach out to info@b2bpeps.com.",
    });
  }
}
