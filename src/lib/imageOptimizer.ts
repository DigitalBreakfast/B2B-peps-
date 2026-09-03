/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Utility to transform Cloudinary and standard image URLs for optimal format (WebP/AVIF),
 * automatic quality compression, and responsive widths.
 */
export function getOptimizedImageUrl(url: string, width?: number): string {
  if (!url) return "";

  // Cloudinary image optimization
  if (url.includes("res.cloudinary.com") && url.includes("/image/upload/")) {
    // If already contains transformation params, leave it
    if (
      url.includes("/image/upload/f_auto") ||
      url.includes("/image/upload/q_auto") ||
      url.includes("/image/upload/w_")
    ) {
      return url;
    }
    const params = width ? `f_auto,q_auto:good,w_${width}` : "f_auto,q_auto:good";
    return url.replace("/image/upload/", `/image/upload/${params}/`);
  }

  // Cloudinary video poster optimization
  if (url.includes("res.cloudinary.com") && url.includes("/video/upload/")) {
    const jpgUrl = url.replace(/\.(mp4|webm|mov)$/, ".jpg");
    const params = width ? `so_0,f_auto,q_auto:good,w_${width}` : "so_0,f_auto,q_auto:good";
    return jpgUrl.replace("/video/upload/", `/video/upload/${params}/`);
  }

  // Unsplash image optimization
  if (url.includes("images.unsplash.com")) {
    if (width) {
      if (url.includes("w=")) {
        return url.replace(/w=\d+/, `w=${width}`);
      }
      return `${url}&w=${width}`;
    }
    return url;
  }

  return url;
}

export function getCloudinarySrcSet(url: string, widths = [360, 640, 960, 1280]): string | undefined {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return undefined;
  }
  return widths
    .map((w) => `${getOptimizedImageUrl(url, w)} ${w}w`)
    .join(", ");
}
