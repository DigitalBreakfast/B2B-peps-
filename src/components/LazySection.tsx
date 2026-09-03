/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  minHeight?: string | number;
  rootMargin?: string;
  className?: string;
}

export default function LazySection({
  children,
  minHeight = "400px",
  rootMargin = "400px",
  className = "",
}: LazySectionProps) {
  // If search engine bot, render immediately for SEO
  const isBot =
    typeof navigator !== "undefined" &&
    /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);

  const [isVisible, setIsVisible] = useState(isBot);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Idle fallback: populate after 2 seconds during idle time
    let idleTimer: any;
    if ("requestIdleCallback" in window) {
      idleTimer = (window as any).requestIdleCallback(
        () => setIsVisible(true),
        { timeout: 2200 }
      );
    } else {
      idleTimer = setTimeout(() => setIsVisible(true), 2200);
    }

    return () => {
      observer.disconnect();
      if ("cancelIdleCallback" in window && typeof idleTimer === "number") {
        (window as any).cancelIdleCallback(idleTimer);
      } else {
        clearTimeout(idleTimer);
      }
    };
  }, [isVisible, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight: isVisible ? undefined : minHeight }}
    >
      {isVisible ? children : null}
    </div>
  );
}
