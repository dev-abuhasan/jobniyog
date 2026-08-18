// /**
//  * Cloudinary service — server-side only.
//  * Never import this file from client components.
//  *
//  * Config priority: Admin DB settings → CLOUDINARY_* env vars.
//  */

// import { v2 as cloudinary } from "cloudinary";
// import { getCloudinaryConfig } from "@/services/server/runtime-config";

// /**
//  * Returns a Cloudinary instance configured with the current DB/env settings.
//  * Called before every upload/delete so config changes take effect without restart.
//  */
// async function getConfiguredCloudinary() {
//   const { cloudName, apiKey, apiSecret } = await getCloudinaryConfig();
//   cloudinary.config({
//     cloud_name: cloudName || process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: apiKey || process.env.CLOUDINARY_API_KEY,
//     api_secret: apiSecret || process.env.CLOUDINARY_API_SECRET,
//     secure: true,
//   });
//   return cloudinary;
// }

// /** Allowed MIME types for image uploads */
// export const ALLOWED_IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp"] as const;

// /** Max upload sizes per context */
// export const MAX_SIZE_BYTES = {
//   product: 5 * 1024 * 1024, // 5 MB
//   banner: 5 * 1024 * 1024, // 5 MB
//   category: 5 * 1024 * 1024, // 5 MB
//   user: 500 * 1024, // 500 KB
//   settings: 5 * 1024 * 1024, // 5 MB (logo, hero, etc.)
// } as const;

// export type UploadContext = keyof typeof MAX_SIZE_BYTES;

// export type CloudinaryUploadResult = {
//   url: string;
//   publicId: string;
// };

// /**
//  * Convert any string to a clean URL/filename slug.
//  * e.g. "My Product — Red (2024)" → "my-product-red-2024"
//  */
// export function slugifyName(name: string): string {
//   return name
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }

// /**
//  * Returns true when the URL is hosted on Cloudinary.
//  */
// export function isCloudinaryUrl(url: string): boolean {
//   try {
//     const { hostname } = new URL(url);
//     return hostname.endsWith("cloudinary.com");
//   } catch {
//     return false;
//   }
// }

// /**
//  * Extracts the Cloudinary public_id from a Cloudinary URL.
//  * Works for URLs like:
//  *   https://res.cloudinary.com/<cloud>/image/upload/v123456789/folder/my-image.jpg
//  * Returns null for non-Cloudinary URLs.
//  */
// export function getPublicIdFromUrl(url: string): string | null {
//   if (!isCloudinaryUrl(url)) return null;
//   try {
//     const { pathname } = new URL(url);
//     // pathname: /image/upload/v123456789/folder/my-image.jpg
//     // Strip leading /image/upload/v<version>/ or /image/upload/
//     const match = pathname.match(/\/image\/upload\/(?:v\d+\/)?(.+)$/);
//     if (!match) return null;
//     // Remove file extension
//     return match[1].replace(/\.[^.]+$/, "");
//   } catch {
//     return null;
//   }
// }

// /**
//  * Upload a Buffer to Cloudinary.
//  *
//  * @param buffer  — Raw image bytes
//  * @param folder  — Cloudinary folder path, e.g. "products/abc123/images"
//  * @param publicId — Desired public_id (without folder prefix); slugified before use
//  * @param mime    — MIME type of the image (must be in ALLOWED_IMAGE_MIMES)
//  * @param context — Size limit context (default: "product")
//  */
// export async function uploadImage(
//   buffer: Buffer,
//   folder: string,
//   publicId: string,
//   mime: string,
//   context: UploadContext = "product",
// ): Promise<CloudinaryUploadResult> {
//   // Validate MIME
//   if (!(ALLOWED_IMAGE_MIMES as readonly string[]).includes(mime)) {
//     throw new Error(`Unsupported image type: ${mime}. Allowed: ${ALLOWED_IMAGE_MIMES.join(", ")}`);
//   }

//   // Validate size
//   const maxBytes = MAX_SIZE_BYTES[context];
//   if (buffer.byteLength > maxBytes) {
//     const maxMB = maxBytes / (1024 * 1024);
//     throw new Error(`Image exceeds ${maxMB} MB limit for context "${context}"`);
//   }

//   const cleanPublicId = slugifyName(publicId) || `img-${Date.now()}`;
//   const cld = await getConfiguredCloudinary();

//   const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
//     const stream = cld.uploader.upload_stream(
//       {
//         folder,
//         public_id: cleanPublicId,
//         overwrite: true,
//         resource_type: "image",
//       },
//       (error, result) => {
//         if (error || !result) reject(error ?? new Error("Cloudinary upload returned no result"));
//         else resolve(result);
//       },
//     );
//     stream.end(buffer);
//   });

//   return {
//     url: result.secure_url,
//     publicId: result.public_id,
//   };
// }

// /**
//  * Delete an image from Cloudinary by its public_id.
//  * Safe to call with null/empty — does nothing.
//  */
// export async function deleteImage(publicId: string | null | undefined): Promise<void> {
//   if (!publicId) return;
//   const cld = await getConfiguredCloudinary();
//   await cld.uploader.destroy(publicId, { resource_type: "image" });
// }
