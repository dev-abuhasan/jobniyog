// import nodemailer from "nodemailer";
// import { getSmtpConfig } from "@/services/server/runtime-config";

// /**
//  * Shared SMTP sender.
//  * All email sending in the app must go through this function.
//  *
//  * - In dev (IS_PRODUCTION !== "true") it only logs to console.
//  * - Delivery errors are caught and logged — they never throw.
//  *
//  * SMTP config priority: Admin DB settings → SMTP_* env vars.
//  */
// export async function sendEmail(params: {
//   to: string;
//   subject: string;
//   html: string;
//   text: string;
//   replyTo?: string;
// }): Promise<void> {
//   const IS_PROD = process.env.IS_PRODUCTION === "true";

//   if (!IS_PROD) {
//     console.log(`[Email] DEV — to: ${params.to} | subject: ${params.subject}`);
//     return;
//   }

//   const { host, port, user, pass, from, senderName } = await getSmtpConfig();

//   if (!host || !user || !pass) {
//     console.error("[Email] Not sent — SMTP host/user/pass are not configured (check DB settings or SMTP_* env vars).");
//     return;
//   }

//   const transporter = nodemailer.createTransport({
//     host,
//     port,
//     secure: port === 465,
//     auth: { user, pass },
//   });

//   try {
//     const senderLabel = senderName?.trim() || "TrendyTalesBD";
//     const fromAddress = from || user;
//     // Domain of the From address — used to align Message-ID and the SMTP envelope
//     // (Return-Path) with the visible From, which DMARC/SPF checks require. When
//     // the From is a @gmail.com address sent through a non-Gmail relay this
//     // alignment fails and mail is filtered to spam — see the deliverability note
//     // in context/pixel-setup.md / the release notes (use a domain sender).
//     const fromDomain = fromAddress.split("@")[1] || "trendytalesbd.com";

//     if (/@gmail\.com$/i.test(fromAddress)) {
//       console.warn(
//         `[Email] From address "${fromAddress}" is a @gmail.com address. ` +
//           "For reliable inbox delivery, send from your own domain (e.g. noreply@trendytalesbd.com) " +
//           "with SPF, DKIM and DMARC configured.",
//       );
//     }

//     await transporter.sendMail({
//       from: `"${senderLabel}" <${fromAddress}>`,
//       replyTo: params.replyTo?.trim() || fromAddress,
//       to: params.to,
//       subject: params.subject,
//       text: params.text,
//       html: params.html,
//       // Align the SMTP envelope sender (Return-Path) with the From domain so
//       // SPF/DMARC alignment passes when a domain sender + DNS are configured.
//       envelope: { from: fromAddress, to: params.to },
//       // Stable, domain-aligned Message-ID (improves reputation vs. a relay default).
//       messageId: `<${Date.now()}.${Math.random().toString(36).slice(2)}@${fromDomain}>`,
//       headers: {
//         "X-Auto-Response-Suppress": "All",
//         "Auto-Submitted": "auto-generated",
//       },
//     });
//   } catch (err) {
//     console.error(`[Email] SMTP delivery failed to ${params.to}:`, err);
//   }
// }
