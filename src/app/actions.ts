"use server";

// Envío del formulario de contacto con Resend (https://resend.com), desde el servidor
// para que la clave de la API nunca llegue al navegador.
// Variables de entorno: RESEND_API_KEY, CONTACT_TO_EMAIL y, opcional, CONTACT_FROM_EMAIL.

import { es } from "./i18n/es";

// Errors are codes, not texts: the form translates them to the visitor's language.
export type ContactErrorCode = "invalid" | "not-configured" | "send-failed";
export type ContactResult = { ok: true } | { ok: false; error: ContactErrorCode };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(formData: FormData): Promise<ContactResult> {
  // Campo trampa: los humanos no lo ven; si viene relleno es un bot y fingimos que todo ha ido bien.
  if (String(formData.get("website") ?? "")) return { ok: true };

  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const message = String(formData.get("message") ?? "").trim().slice(0, 800);
  const topic = (es.form.topics as Record<string, string>)[String(formData.get("topic") ?? "")] ?? "Contacto";

  if (!name || !message || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Formulario de contacto: faltan RESEND_API_KEY o CONTACT_TO_EMAIL");
    return { ok: false, error: "not-configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `${topic} · ${name}`,
      text: `${message}\n\n— ${name} (${email})\nTema: ${topic}`,
    }),
  });

  if (!response.ok) {
    console.error("Formulario de contacto: Resend respondió", response.status, await response.text());
    return { ok: false, error: "send-failed" };
  }

  return { ok: true };
}
