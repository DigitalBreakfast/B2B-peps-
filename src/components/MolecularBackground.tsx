/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function MolecularBackground({ theme: overrideTheme }: { theme?: string }) {
  const { theme: contextTheme } = useTheme();
  const currentTheme = overrideTheme || contextTheme;
  const isDark = currentTheme === "dark" || currentTheme === "executive-dark" || currentTheme === "concept-c";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const w = canvas.width;
      const h = canvas.height;
      const isMobile = w < 768;
      const count = isMobile ? 12 : 24;

      for (let i = 0; i < count; i++) {
        const randomType = Math.random();
        let color = "rgba(16, 185, 129, 0.08)";
        let radius = 10 + Math.random() * 30;

        if (!isDark) {
          // Light Mode
          if (randomType < 0.35) {
            color = "rgba(13, 148, 136, 0.08)"; // Teal
          } else if (randomType < 0.7) {
            color = "rgba(71, 85, 105, 0.06)"; // Slate
          } else {
            color = "rgba(56, 189, 248, 0.06)"; // Cyan
          }
        } else {
          // Dark Mode
          if (randomType < 0.3) {
            color = "rgba(255, 255, 255, 0.03)";
          } else if (randomType < 0.6) {
            color = "rgba(45, 212, 191, 0.06)";
          } else {
            color = "rgba(16, 185, 129, 0.04)";
          }
        }

        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          radius,
          color,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();

    // Main render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;

      const time = Date.now() * 0.0003;
      const glow1X = w * 0.5 + Math.cos(time) * (w * 0.15);
      const glow1Y = h * 0.4 + Math.sin(time * 0.8) * (h * 0.15);
      
      const gradient1 = ctx.createRadialGradient(glow1X, glow1Y, 10, glow1X, glow1Y, Math.max(w, h) * 0.4);
      if (isDark) {
        gradient1.addColorStop(0, "rgba(16, 185, 129, 0.05)");
        gradient1.addColorStop(0.5, "rgba(20, 184, 166, 0.01)");
        gradient1.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        gradient1.addColorStop(0, "rgba(13, 148, 136, 0.04)");
        gradient1.addColorStop(0.5, "rgba(56, 189, 248, 0.02)");
        gradient1.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);

      // Draw and connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 0 || n1.x > w) n1.vx *= -1;
        if (n1.y < 0 || n1.y > h) n1.vy *= -1;

        if (n1.x < 0) n1.x = 0;
        if (n1.x > w) n1.x = w;
        if (n1.y < 0) n1.y = 0;
        if (n1.y > h) n1.y = h;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - n1.x;
          const dy = mouse.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 300) {
            const force = (300 - dist) * 0.00004;
            n1.x += dx * force;
            n1.y += dy * force;
          }
        }

        // Draw connection lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const alpha = (1 - dist / 200) * (isDark ? 0.04 : 0.08);
            ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(15, 23, 42, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw soft glowing node
        const nodeGlow = ctx.createRadialGradient(n1.x, n1.y, 0, n1.x, n1.y, n1.radius);
        nodeGlow.addColorStop(0, n1.color);
        nodeGlow.addColorStop(1, isDark ? "rgba(0, 0, 0, 0)" : "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(13, 148, 136, 0.2)";
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [currentTheme, isDark]);

  return (
    <canvas
      id="molecular-mesh"
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto transition-opacity duration-500 ${
        isDark ? "mix-blend-screen opacity-70" : "mix-blend-multiply opacity-50"
      }`}
    />
  );
}
