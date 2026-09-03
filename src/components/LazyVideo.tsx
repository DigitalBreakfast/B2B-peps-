/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, VideoHTMLAttributes } from "react";
import { getOptimizedImageUrl } from "../lib/imageOptimizer";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  posterWidth?: number;
  rootMargin?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export default function LazyVideo({
  src,
  posterWidth = 800,
  rootMargin = "350px",
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  ...props
}: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate an optimized poster frame directly from the Cloudinary video URL
  const posterUrl = getOptimizedImageUrl(src, posterWidth);

  useEffect(() => {
    // If browser doesn't support IntersectionObserver, load immediately
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {shouldLoad ? (
        <video
          src={src}
          poster={posterUrl}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload="metadata"
          className="w-full h-full object-cover"
          {...props}
        />
      ) : (
        <img
          src={posterUrl}
          alt="Video thumbnail preview"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
