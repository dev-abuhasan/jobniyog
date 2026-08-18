import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = resolve(__dirname, "templates");

/**
 * Read an HTML template file and substitute all `{{VARIABLE}}` placeholders.
 * Variables not provided remain as-is (so missing keys are obvious in output).
 */
function renderTemplate(templateName: string, vars: Record<string, string>): string {
  const filePath = resolve(TEMPLATES_DIR, templateName);
  let html = readFileSync(filePath, "utf-8");
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, value);
  }
  return html;
}

// ─── Shared defaults ─────────────────────────────────────────────────────────

function baseVars() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  // Use the env URL only when it's a real publicly-reachable domain.
  // localhost / 127.0.0.1 URLs cannot be fetched by email clients.
  const siteUrl =
    rawUrl && !rawUrl.includes("localhost") && !rawUrl.includes("127.0.0.1")
      ? rawUrl.replace(/\/$/, "")
      : "https://www.trendytalesbd.com";
  return {
    SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? "TrendyTalesBD",
    SITE_URL: siteUrl,
    LOGO_SRC: process.env.EMAIL_LOGO_URL?.trim() || `${siteUrl}/assets/img/logo-nobg.png`,
    YEAR: String(new Date().getFullYear()),
  };
}

// ─── OTP: Signup ─────────────────────────────────────────────────────────────

export function renderOtpSignupEmail(params: {
  customerName: string;
  otp: string;
  expiryMinutes: number;
}): { subject: string; html: string; text: string } {
  const vars = {
    ...baseVars(),
    CUSTOMER_NAME: params.customerName,
    OTP_CODE: params.otp,
    EXPIRY_MINUTES: String(params.expiryMinutes),
  };
  return {
    subject: `${vars.SITE_NAME} — Verify your email address`,
    html: renderTemplate("otp-signup.html", vars),
    text: [
      `Verify your email address for ${vars.SITE_NAME}.`,
      "",
      `Verification code: ${params.otp}`,
      `This code expires in ${params.expiryMinutes} minutes.`,
      "",
      `If you did not create an account, you can ignore this message.`,
      `Visit: ${vars.SITE_URL}`,
    ].join("\n"),
  };
}

// ─── OTP: Reset Password ─────────────────────────────────────────────────────

export function renderOtpResetEmail(params: {
  customerName: string;
  otp: string;
  expiryMinutes: number;
}): { subject: string; html: string; text: string } {
  const vars = {
    ...baseVars(),
    CUSTOMER_NAME: params.customerName,
    OTP_CODE: params.otp,
    EXPIRY_MINUTES: String(params.expiryMinutes),
  };
  return {
    subject: `${vars.SITE_NAME} — Reset your password`,
    html: renderTemplate("otp-reset-password.html", vars),
    text: `Your ${vars.SITE_NAME} password reset code is: ${params.otp}\n\nThis code expires in ${params.expiryMinutes} minutes. If you did not request this, ignore this email.`,
  };
}

// ─── Welcome Email ────────────────────────────────────────────────────────────

export function renderWelcomeEmail(params: {
  customerName: string;
}): { subject: string; html: string; text: string } {
  const vars = {
    ...baseVars(),
    CUSTOMER_NAME: params.customerName,
  };
  return {
    subject: `Welcome to ${vars.SITE_NAME}! 🎉`,
    html: renderTemplate("welcome.html", vars),
    text: `Welcome to ${vars.SITE_NAME}, ${params.customerName}!\n\nYour account is verified and ready. Start shopping at ${vars.SITE_URL}`,
  };
}

// ─── Order Confirmation ───────────────────────────────────────────────────────

export type OrderEmailItem = {
  title: string;
  variant?: string;
  quantity: number;
  price: number;
};

export function renderOrderConfirmationEmail(params: {
  customerName: string;
  orderId: string | number;
  items: OrderEmailItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  district: string;
  address: string;
}): { subject: string; html: string; text: string } {
  const fmt = (n: number) => `৳${n.toLocaleString("en-BD")}`;

  const itemRows = params.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #f1e8d8;font-size:14px;color:#1f1a17">
          ${item.title}${item.variant ? `<br><span style="font-size:12px;color:#9b8270">${item.variant}</span>` : ""}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid #f1e8d8;font-size:14px;color:#6f5b48;text-align:center">${item.quantity}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #f1e8d8;font-size:14px;color:#1f1a17;text-align:right;white-space:nowrap">${fmt(item.price)}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #f1e8d8;font-size:14px;font-weight:600;color:#1f1a17;text-align:right;white-space:nowrap">${fmt(item.price * item.quantity)}</td>
      </tr>`
    )
    .join("");

  const paymentLabel =
    params.paymentMethod === "cod" ? "Cash on Delivery" : params.paymentMethod;

  const vars = {
    ...baseVars(),
    CUSTOMER_NAME: params.customerName,
    ORDER_ID: String(params.orderId),
    ORDER_DATE: new Date().toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" }),
    ORDER_ITEMS_ROWS: itemRows,
    SUBTOTAL: fmt(params.subtotal),
    DELIVERY_FEE: fmt(params.deliveryFee),
    TOTAL: fmt(params.total),
    PAYMENT_METHOD: paymentLabel,
    DELIVERY_DISTRICT: params.district,
    DELIVERY_ADDRESS: params.address,
  };

  return {
    subject: `${vars.SITE_NAME} — Order #${params.orderId} confirmed!`,
    html: renderTemplate("order-confirmation.html", vars),
    text: `Order #${params.orderId} confirmed!\n\nThank you ${params.customerName}. Your order total is ${fmt(params.total)}.\nPayment: ${paymentLabel}\nDelivery: ${params.address}, ${params.district}`,
  };
}

// ─── Admin: New Order Notification ───────────────────────────────────────────

export function renderAdminOrderNotificationEmail(params: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  orderId: string | number;
  items: OrderEmailItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  division?: string;
  district: string;
  area?: string;
  address: string;
  notes?: string;
}): { subject: string; html: string; text: string } {
  const fmt = (n: number) => `৳${n.toLocaleString("en-BD")}`;
  const paymentLabel =
    params.paymentMethod === "cod" ? "Cash on Delivery" : params.paymentMethod;

  const itemRows = params.items
    .map(
      (item) => `
      <tr>
        <td style="padding:12px 14px;border-bottom:1px solid #e8f0fb;font-size:13px;color:#1e3a5f">
          <span style="font-weight:600">${item.title}</span>
          ${item.variant ? `<br/><span style="font-size:11px;color:#6b8ab0">${item.variant}</span>` : ""}
        </td>
        <td style="padding:12px 14px;border-bottom:1px solid #e8f0fb;font-size:13px;color:#4a6a8a;text-align:center">${item.quantity}</td>
        <td style="padding:12px 14px;border-bottom:1px solid #e8f0fb;font-size:13px;color:#4a6a8a;text-align:right">${fmt(item.price)}</td>
        <td style="padding:12px 14px;border-bottom:1px solid #e8f0fb;font-size:13px;color:#1e3a5f;font-weight:600;text-align:right">${fmt(item.price * item.quantity)}</td>
      </tr>`
    )
    .join("");

  // Customer email row — only included when email is known
  const customerEmailRow = params.customerEmail
    ? `<tr>
        <td colspan="2" style="padding:0 18px 14px;border-top:1px solid #d0dff0">
          <p style="margin:8px 0 4px;font-size:10px;font-weight:700;color:#6b8ab0;text-transform:uppercase;letter-spacing:0.8px">Email</p>
          <p style="margin:0;font-size:13px;color:#1e3a5f">${params.customerEmail}</p>
        </td>
      </tr>`
    : "";

  // Build area / district / division string
  const areaParts = [params.area, params.district].filter(Boolean).join(", ");
  const divisionSuffix = params.division ? `, ${params.division}` : "";

  // Notes block — only rendered when notes are present
  const notesBlock = params.notes?.trim()
    ? `<tr>
        <td style="padding:0 32px 8px">
          <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#1e3a5f;text-transform:uppercase;letter-spacing:1px">Order Notes</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fffbf0;border-radius:10px;border:1px solid #f5dfa0">
            <tr><td style="padding:14px 18px;font-size:13px;color:#5a4a20;line-height:1.6">${params.notes.trim()}</td></tr>
          </table>
        </td>
      </tr>`
    : "";

  const textItems = params.items
    .map((i) => `  - ${i.title}${i.variant ? ` (${i.variant})` : ""} x${i.quantity} = ${fmt(i.price * i.quantity)}`)
    .join("\n");

  const vars = {
    ...baseVars(),
    CUSTOMER_NAME: params.customerName,
    CUSTOMER_PHONE: params.customerPhone,
    CUSTOMER_EMAIL_ROW: customerEmailRow,
    ORDER_ID: String(params.orderId),
    ORDER_DATE: new Date().toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" }),
    ORDER_ITEMS_ROWS: itemRows,
    SUBTOTAL: fmt(params.subtotal),
    DELIVERY_FEE: fmt(params.deliveryFee),
    TOTAL: fmt(params.total),
    PAYMENT_METHOD: paymentLabel,
    DELIVERY_ADDRESS_LINE: params.address,
    DELIVERY_AREA_DISTRICT: areaParts,
    DIVISION_SUFFIX: divisionSuffix,
    ORDER_NOTES_BLOCK: notesBlock,
  };

  return {
    subject: `[New Order] #${params.orderId} — ${params.customerName} — ${fmt(params.total)}`,
    html: renderTemplate("admin-order-notification.html", vars),
    text: [
      `NEW ORDER #${params.orderId}`,
      `Date: ${vars.ORDER_DATE}`,
      ``,
      `Customer: ${params.customerName}`,
      `Phone: ${params.customerPhone}`,
      params.customerEmail ? `Email: ${params.customerEmail}` : null,
      ``,
      `Delivery: ${params.address}, ${areaParts}${divisionSuffix}`,
      params.notes?.trim() ? `Notes: ${params.notes.trim()}` : null,
      ``,
      `Items:`,
      textItems,
      ``,
      `Subtotal:     ${fmt(params.subtotal)}`,
      `Delivery fee: ${fmt(params.deliveryFee)}`,
      `Total:        ${fmt(params.total)}`,
      `Payment:      ${paymentLabel}`,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  };
}

// ─── Contact Form Message ────────────────────────────────────────────────────

/** Escape user-supplied text for safe embedding in the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderContactMessageEmail(params: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): { subject: string; html: string; text: string } {
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email);
  const safeSubject = escapeHtml(params.subject);
  // Preserve line breaks in the message body, escaping each segment.
  const safeMessage = escapeHtml(params.message).replace(/\r?\n/g, "<br/>");

  const phoneBlock = params.phone?.trim()
    ? `<tr>
        <td style="padding:6px 18px 16px">
          <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#6b8ab0;text-transform:uppercase;letter-spacing:0.8px">Phone</p>
          <p style="margin:0;font-size:14px;color:#1e3a5f">${escapeHtml(params.phone.trim())}</p>
        </td>
      </tr>`
    : "";

  const vars = {
    ...baseVars(),
    SENDER_NAME: safeName,
    SENDER_EMAIL: safeEmail,
    SUBJECT: safeSubject,
    MESSAGE: safeMessage,
    PHONE_BLOCK: phoneBlock,
    SUBMITTED_AT: new Date().toLocaleString("en-BD", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }),
  };

  return {
    subject: `[Contact] ${params.subject} — ${params.name}`,
    html: renderTemplate("contact-message.html", vars),
    text: [
      `NEW CONTACT MESSAGE`,
      ``,
      `Name:    ${params.name}`,
      `Email:   ${params.email}`,
      params.phone?.trim() ? `Phone:   ${params.phone.trim()}` : null,
      `Subject: ${params.subject}`,
      ``,
      `Message:`,
      params.message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  };
}
