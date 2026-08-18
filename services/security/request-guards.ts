import { NextRequest, NextResponse } from "next/server";
import { isAdminTrustedOrigin, isProductionEnvironment, isTrustedHost, isTrustedOrigin } from "@/services/security/config";

type RateLimitOptions = {
  bucket: string;
  max: number;
  windowMs: number;
  keySuffix?: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip")?.trim()
    || req.headers.get("cf-connecting-ip")?.trim()
    || "unknown";
}

function getRequestOrigin(req: NextRequest): string | null {
  const origin = req.headers.get("origin");
  if (origin) {
    return origin;
  }

  const referer = req.headers.get("referer");
  if (!referer) {
    return null;
  }

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-site");

  if (isProductionEnvironment()) {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  return response;
}

export function rejectUntrustedHost(req: NextRequest): NextResponse | null {
  if (!isProductionEnvironment()) {
    return null;
  }

  if (isTrustedHost(req.nextUrl.host)) {
    return null;
  }

  return applySecurityHeaders(
    NextResponse.json({ error: "Host not allowed" }, { status: 403 })
  );
}

export function enforceTrustedOrigin(req: NextRequest): NextResponse | null {
  const method = req.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return null;
  }

  const origin = getRequestOrigin(req);
  if (!origin || !isTrustedOrigin(origin)) {
    return applySecurityHeaders(
      NextResponse.json({ error: "Origin not allowed" }, { status: 403 })
    );
  }

  return null;
}

export function enforceAdminTrustedOrigin(req: NextRequest): NextResponse | null {
  const method = req.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return null;
  }

  const origin = getRequestOrigin(req);
  if (!origin || !isAdminTrustedOrigin(origin)) {
    return applySecurityHeaders(
      NextResponse.json({ error: "Origin not allowed" }, { status: 403 })
    );
  }

  return null;
}

export function enforceRateLimit(req: NextRequest, options: RateLimitOptions): NextResponse | null {
  const now = Date.now();
  const ip = getClientIp(req);
  const key = `${options.bucket}:${ip}:${options.keySuffix ?? "default"}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  if (current.count >= options.max) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
    response.headers.set("Retry-After", String(retryAfter));
    response.headers.set("X-RateLimit-Limit", String(options.max));
    response.headers.set("X-RateLimit-Remaining", "0");
    response.headers.set("X-RateLimit-Reset", String(Math.ceil(current.resetAt / 1000)));
    return applySecurityHeaders(response);
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return null;
}
