/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContactInquiryPayload {
  name: string;
  company?: string;
  email: string;
  whatsapp?: string;
  telegram?: string;
  selectedHelp: string[];
  monthlyRequirement?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  userTimezone?: string;
  reference?: string;
  /** Hidden anti-spam honeypot. Bots will fill this out, humans will not. */
  b2b_website_hp?: string;
}

export interface ContactApiResponse {
  success: boolean;
  reference?: string;
  message?: string;
  error?: string;
}
