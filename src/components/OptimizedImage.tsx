/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ImgHTMLAttributes, useState } from "react";
import { getOptimizedImageUrl, getCloudinarySrcSet } from "../lib/imageOptimizer";

export interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  maxWidth?: number;
  priority?: boolean;
  className?: string;
  responsive?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  maxWidth = 800,
  priority = false,
  className = "",
  responsive = true,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimized base src
  const optimizedSrc = getOptimizedImageUrl(src, maxWidth);
  
  // Cloudinary responsive srcSet
  const srcSet = responsive && src?.includes("res.cloudinary.com") 
    ? getCloudinarySrcSet(src, [360, 640, 960, 1280]) 
    : undefined;

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={responsive ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px" : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      referrerPolicy="no-referrer"
      onLoad={() => setIsLoaded(true)}
      className={`${className} ${!isLoaded && !priority ? "transition-opacity duration-300 opacity-90" : "opacity-100"}`}
      {...props}
    />
  );
}
