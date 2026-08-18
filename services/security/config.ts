const DEFAULT_PRODUCTION_ORIGINS = [
  "https://www.trendytalesbd.com",
  "https://trendytalesbd.com",
  "https://trendytalesbd.vercel.app"
];

const DEFAULT_DEVELOPMENT_ORIGINS = [
  ...DEFAULT_PRODUCTION_ORIGINS,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const DEFAULT_ADMIN_PRODUCTION_ORIGINS = [
  "https://admin.trendytalesbd.com",
];

const DEFAULT_ADMIN_DEVELOPMENT_ORIGINS = [
  ...DEFAULT_ADMIN_PRODUCTION_ORIGINS,
  "http://localhost:3001",
  "http://127.0.0.1:3001",
];

function parseList(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value).origin.toLowerCase();
  } catch {
    return null;
  }
}

function normalizeHost(value: string): string {
  return value.toLowerCase().replace(/:\d+$/, "");
}

function buildAllowedOrigins(): string[] {
  const defaults = process.env.IS_PRODUCTION === "true"
    ? DEFAULT_PRODUCTION_ORIGINS
    : DEFAULT_DEVELOPMENT_ORIGINS;

  const configured = [
    ...parseList(process.env.ALLOWED_ORIGINS),
    ...parseList(process.env.NEXT_PUBLIC_ALLOWED_ORIGINS),
  ];

  return Array.from(
    new Set(
      [...defaults, ...configured]
        .map((origin) => normalizeOrigin(origin))
        .filter((origin): origin is string => Boolean(origin))
    )
  );
}

function buildAdminAllowedOrigins(): string[] {
  const defaults = process.env.IS_PRODUCTION === "true"
    ? DEFAULT_ADMIN_PRODUCTION_ORIGINS
    : DEFAULT_ADMIN_DEVELOPMENT_ORIGINS;

  const configured = parseList(process.env.ADMIN_ALLOWED_ORIGINS);

  return Array.from(
    new Set(
      [...defaults, ...configured]
        .map((origin) => normalizeOrigin(origin))
        .filter((origin): origin is string => Boolean(origin))
    )
  );
}

function buildAllowedHosts(): string[] {
  const configuredHosts = parseList(process.env.ALLOWED_HOSTS).map(normalizeHost);
  const originHosts = buildAllowedOrigins().map((origin) => normalizeHost(new URL(origin).host));

  return Array.from(new Set([...originHosts, ...configuredHosts]));
}

function buildAdminAllowedHosts(): string[] {
  const configuredHosts = parseList(process.env.ADMIN_ALLOWED_HOSTS).map(normalizeHost);
  const originHosts = buildAdminAllowedOrigins().map((origin) => normalizeHost(new URL(origin).host));

  return Array.from(new Set([...originHosts, ...configuredHosts]));
}

export function getAllowedOrigins(): string[] {
  return buildAllowedOrigins();
}

export function getAllowedHosts(): string[] {
  return buildAllowedHosts();
}

export function getAdminAllowedOrigins(): string[] {
  return buildAdminAllowedOrigins();
}

export function getAdminAllowedHosts(): string[] {
  return buildAdminAllowedHosts();
}

export function isTrustedOrigin(origin: string | null | undefined): boolean {
  if (!origin) {
    return false;
  }

  const normalized = normalizeOrigin(origin);
  if (!normalized) {
    return false;
  }

  return getAllowedOrigins().includes(normalized);
}

export function isTrustedHost(host: string | null | undefined): boolean {
  if (!host) {
    return false;
  }

  return getAllowedHosts().includes(normalizeHost(host));
}

export function isAdminTrustedOrigin(origin: string | null | undefined): boolean {
  if (!origin) {
    return false;
  }

  const normalized = normalizeOrigin(origin);
  if (!normalized) {
    return false;
  }

  return getAdminAllowedOrigins().includes(normalized);
}

export function isAdminTrustedHost(host: string | null | undefined): boolean {
  if (!host) {
    return false;
  }

  return getAdminAllowedHosts().includes(normalizeHost(host));
}

export function isProductionEnvironment(): boolean {
  return process.env.IS_PRODUCTION === "true";
}
