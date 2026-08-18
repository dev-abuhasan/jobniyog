/**
 * Cloudinary URL transformation utility — safe for client and server use.
 * No Cloudinary SDK dependency; pure string manipulation only.
 *
 * Why this exists:
 *   When Next.js `<Image />` proxies a Cloudinary URL through `/_next/image`,
 *   it downloads the full-resolution original, then re-encodes it to AVIF/WebP.
 *   For large PNGs (5 MB+), this takes 7+ seconds and often returns a 500 error.
 *
 *   The fix: inject Cloudinary's own transformation params (f_auto, q_auto, w_N)
 *   into the URL before rendering, then mark the image `unoptimized` so Next.js
 *   serves it directly from Cloudinary's CDN — no proxy, no timeout.
 */

// Matches: https://res.cloudinary.com/<cloud>/image/upload/...
//   Group 1: base up to and including "/upload/"
//   Group 2: existing transform segments ONLY (e.g. "f_auto,q_auto,c_limit,w_800/")
//            Transform segments are comma-separated "key_value" pairs where key
//            is 1–3 lowercase letters (f_, q_, w_, ar_, dpr_, …). Plain folder
//            segments like "products/" or "fashion/" are intentionally NOT matched
//            so they are preserved in the public_id (group 4).
//   Group 3: version segment (optional, e.g. "v1778755367/")
//   Group 4: the public_id path + filename
const CLOUDINARY_RE =
  /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)((?:(?:[a-z]{1,3}_[a-z0-9][a-z0-9.:_]*(?:,[a-z]{1,3}_[a-z0-9][a-z0-9.:_]*)*)\/)*)(v\d+\/)?(.+)$/;

export type CloudinaryTransformOpts = {
  /** Maximum width in pixels. Cloudinary will not upscale. Default: 800 */
  width?: number;
  /** Quality. Default: "auto" */
  quality?: "auto" | number;
  /** Format. Default: "auto" (Cloudinary picks webp/avif per browser) */
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  /** Crop mode. Default: "limit" (only shrinks, never crops) */
  crop?: "limit" | "fill" | "fit" | "scale" | "thumb";
  /** Height constraint (optional) */
  height?: number;
  /** Optional overlay (watermark) to apply as a layer */
  overlay?: {
    /** Cloudinary public_id (e.g. "brand/logo-nobg" or "logo-nobg") */
    publicId: string;
    /** Overlay width in px (optional) */
    width?: number;
    /** Overlay height in px (optional) */
    height?: number;
    /** Gravity/position (e.g. "south_east") */
    gravity?: string;
    /** X offset in px (optional) */
    x?: number;
    /** Y offset in px (optional) */
    y?: number;
    /** Opacity 0-100 (optional) */
    opacity?: number;
  };
};

// Optional default overlay public_id (set in .env.local / platform env as
// NEXT_PUBLIC_CLOUDINARY_WATERMARK_PUBLIC_ID). When present, the cld* presets
// will attach this overlay automatically.
const DEFAULT_WATERMARK_PUBLIC_ID: string | null =
  (process.env.NEXT_PUBLIC_CLOUDINARY_WATERMARK_PUBLIC_ID as string) ?? null;

// Our Cloudinary cloud name (client-friendly env var supported if prefixed
// with NEXT_PUBLIC_ so client code can also build fetch URLs when necessary.)
const OUR_CLOUD_NAME: string | null =
  (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string) ?? (process.env.CLOUDINARY_CLOUD_NAME as string) ?? null;

/**
 * Returns true when the given URL is a Cloudinary upload URL.
 * Safe to call with any string (catches bad URLs).
 */
export function isCloudinaryUrl(url: unknown): url is string {
  if (typeof url !== "string") return false;
  return CLOUDINARY_RE.test(url);
}

/**
 * Returns true when the given Cloudinary URL already contains a transform
 * segment (e.g. `/upload/f_auto,q_auto,w_800/...`). When true, callers
 * should not re-inject transforms as that would replace existing transforms.
 */
export function cloudinaryHasTransform(url: unknown): boolean {
  if (typeof url !== "string") return false;
  const m = url.match(CLOUDINARY_RE);
  if (!m) return false;
  // m[2] is the transform segment captured by the regex (may be empty)
  return Boolean(m[2] && m[2].length > 0);
}

/**
 * Injects (or replaces) Cloudinary transformation parameters into a URL.
 * Non-Cloudinary URLs are returned unchanged.
 *
 * @example
 * transformCloudinaryUrl(url, { width: 400 })
 * // → https://res.cloudinary.com/cloud/image/upload/f_auto,q_auto,c_limit,w_400/v123/path.jpg
 */
export function transformCloudinaryUrl(
  url: string,
  opts: CloudinaryTransformOpts = {}
): string {
  const m = url.match(CLOUDINARY_RE);
  if (!m) return url;
  const [, base, , version, path] = m;
  // Discard any existing transforms (groups 2+3) — rebuild from opts.

  const parts: string[] = [];
  parts.push(`f_${opts.format ?? "auto"}`);
  parts.push(`q_${opts.quality ?? "auto"}`);
  parts.push(`c_${opts.crop ?? "limit"}`);
  if (opts.width) parts.push(`w_${opts.width}`);
  if (opts.height) parts.push(`h_${opts.height}`);

  const transform = parts.join(",");
  // Build optional overlay transform (placed after the primary transform).
  let overlayTransform: string | null = null;
  // Default overlay options: when no explicit overlay is provided and a
  // `NEXT_PUBLIC_CLOUDINARY_WATERMARK_PUBLIC_ID` exists, apply it centered
  // with a lower opacity so it is visible but unobtrusive.
  const overlayOpts =
    opts.overlay ??
    (DEFAULT_WATERMARK_PUBLIC_ID
      ? { publicId: DEFAULT_WATERMARK_PUBLIC_ID, gravity: "center", opacity: 40 }
      : undefined);
  if (overlayOpts && overlayOpts.publicId) {
    const o = overlayOpts as NonNullable<typeof overlayOpts>;
    // Decode percent-encoding if present, remove extension, turn slashes into
    // Cloudinary folder separator ':' and then URL-encode while preserving ':'
    let raw = o.publicId;
    try {
      raw = decodeURIComponent(raw);
    } catch {
      // ignore
    }
    const publicId = raw.replace(/\.[^.]+$/, "").replace(/\//g, ":");
    const publicIdForUrl = encodeURIComponent(publicId).replace(/%3A/g, ":");

    const oParts: string[] = [];
    oParts.push(`l_${publicIdForUrl}`);
    if (o.width) oParts.push(`w_${o.width}`);
    if (o.height) oParts.push(`h_${o.height}`);
    if (o.gravity) oParts.push(`g_${o.gravity}`);
    if (o.x !== undefined) oParts.push(`x_${o.x}`);
    if (o.y !== undefined) oParts.push(`y_${o.y}`);
    if (o.opacity !== undefined) oParts.push(`o_${o.opacity}`);
    overlayTransform = oParts.join(",");
  }
  const versionPart = version ?? "";
  // If the original image belongs to a different Cloudinary cloud than our
  // configured account, it's not possible to reference a watermark `publicId`
  // from our account on that remote cloud. In that case, construct a Cloudinary
  // `fetch` URL anchored to our cloud so Cloudinary will fetch the original
  // image, apply our overlay, cache it, and serve the watermarked result.
  try {
    const originCloudMatch = url.match(/^https:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\//);
    const originCloud = originCloudMatch ? originCloudMatch[1] : null;
    if (OUR_CLOUD_NAME && originCloud && originCloud !== OUR_CLOUD_NAME) {
      // Build fetch-style transform: <baseFetch>/image/fetch/<transform>[/<overlay>]/<encodedUrl>
      const combinedTransform = transform;
      const encoded = encodeURIComponent(url);
      if (overlayTransform) {
        return `https://res.cloudinary.com/${OUR_CLOUD_NAME}/image/fetch/${combinedTransform}/${overlayTransform}/${encoded}`;
      }
      return `https://res.cloudinary.com/${OUR_CLOUD_NAME}/image/fetch/${combinedTransform}/${encoded}`;
    }
  } catch {
    // ignore and fall back to in-place upload URL transform
  }

  if (overlayTransform) {
    return `${base}${transform}/${overlayTransform}/${versionPart}${path}`;
  }
  return `${base}${transform}/${versionPart}${path}`;
}

// ── Presets ────────────────────────────────────────────────────────────────────

/**
 * Tiny thumbnail: cart drawer, order list, wishlist chips.
 * 160px — adequate for 80px display at 2× retina.
 */
export function cldThumb(url: string): string {
  return transformCloudinaryUrl(url, {
    width: 160,
    overlay: DEFAULT_WATERMARK_PUBLIC_ID
      ? { publicId: DEFAULT_WATERMARK_PUBLIC_ID, width: 28, gravity: "center", opacity: 40 }
      : undefined,
  });
}

/**
 * Product card / grid image.
 * 480px — good for 240px cards at 2× retina.
 */
export function cldCard(url: string): string {
  return transformCloudinaryUrl(url, {
    width: 480,
    overlay: DEFAULT_WATERMARK_PUBLIC_ID
      ? { publicId: DEFAULT_WATERMARK_PUBLIC_ID, width: 56, gravity: "center", opacity: 40 }
      : undefined,
  });
}

/**
 * Product detail main image / gallery.
 * 1000px — good for up to 500px containers at 2× retina.
 */
export function cldDetail(url: string): string {
  return transformCloudinaryUrl(url, {
    width: 1000,
    overlay: DEFAULT_WATERMARK_PUBLIC_ID
      ? { publicId: DEFAULT_WATERMARK_PUBLIC_ID, width: 140, gravity: "center", opacity: 40 }
      : undefined,
  });
}

/**
 * Hero banner / full-width background.
 * 1440px — enough for large desktop viewports.
 */
export function cldHero(url: string): string {
  return transformCloudinaryUrl(url, {
    width: 1440,
    crop: "limit",
    overlay: DEFAULT_WATERMARK_PUBLIC_ID
      ? { publicId: DEFAULT_WATERMARK_PUBLIC_ID, width: 180, gravity: "center", opacity: 40 }
      : undefined,
  });
}
