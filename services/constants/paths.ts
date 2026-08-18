/**
 * Centralised route definitions.
 * All hrefs used across JSON configs, components, and pages should reference these.
 */

// ── Static pages (exist in app/) ──────────────────────────────────────────────
export const PATHS = {
  HOME: "/",
  DOCS: "/documentation",

  // Pages group
  CONTACT: "/pages/contact",
  PRIVACY_POLICY: "/pages/privacy-policy",
  RETURN_REFUND: "/pages/return-refund",
  TERMS: "/pages/terms",

  // Shop
  NEW_ARRIVALS: "/new-arrivals",
  BEST_SELLERS: "/best-sellers",
  DEALS: "/deals",

  // Category
  CATEGORY: "/category",
  CATEGORY_WOMEN: "/category/women",
  CATEGORY_MEN: "/category/men",
  CATEGORY_KIDS: "/category/kids",

  // Company
  ABOUT: "/about",
  CAREERS: "/careers",

  // Support
  HELP: "/pages/contact",
  TRACK_ORDER: "/track-order",

  // User account
  ACCOUNT: "/account",
  ACCOUNT_ADDRESSES: "/account/manage-address",
  ORDERS: "/orders",
  WISHLIST: "/wishlist",
  CART: "/cart",

  // Products
  PRODUCTS: "/products",

  // Checkout & orders
  CHECKOUT: "/checkout",
  ORDER: "/order",

  // Auth
  LOGIN: "/login",
  SIGNUP: "/signup",

  // Search
  SEARCH: "/search",
} as const;

export type AppPath = (typeof PATHS)[keyof typeof PATHS];

/**
 * Returns a locale-prefixed version of a path.
 *
 * The default locale ("en") is served from the root, so paths are returned
 * unchanged. For other locales the path is prefixed with `/<locale>`.
 *
 * Admin-authored links are handled defensively so they never break:
 * external / protocol-relative URLs (`https://…`, `//…`), other schemes
 * (`mailto:`, `tel:`), in-page anchors (`#…`) and bare relative strings are
 * returned untouched, and paths that are already locale-prefixed (e.g.
 * `/bn/products`) are not prefixed twice.
 */
export const localePath = (path: string, locale: string): string => {
  const raw = (path ?? "").trim();

  // Only internal, root-relative paths are localizable. Anything else
  // (external/protocol-relative URLs, anchors, mailto/tel, relatives) passes through.
  if (!raw.startsWith("/") || raw.startsWith("//")) return raw;
  if (locale === "en") return raw;

  const prefix = `/${locale}`;
  // Don't double-prefix a path the admin already localized.
  if (raw === prefix || raw.startsWith(`${prefix}/`)) return raw;

  return raw === "/" ? prefix : `${prefix}${raw}`;
};

/** Returns the path for a single product detail page. */
export const productPath = (handle: string): string => `/products/${handle}`;

/** Returns the path for a single product detail page preselecting a variant. */
export const productVariantPath = (handle: string, variantId?: string | number | null): string => {
  const basePath = productPath(handle);

  if (!variantId) {
    return basePath;
  }

  return `${basePath}?variant=${encodeURIComponent(String(variantId))}`;
};

/** Returns the path for an order confirmation/tracking page. */
export const orderPath = (id: string | number): string => `/order/${String(id)}`;
