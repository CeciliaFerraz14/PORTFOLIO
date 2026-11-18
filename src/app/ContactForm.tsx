"use client";

import { useState } from "react";
import { sendContactMessage, type ContactErrorCode } from "./actions";
import { useLanguage } from "./i18n/LanguageProvider";

const topics = [
  { id: "proyecto", color: "coral" },
  { id: "colaboracion", color: "lilac" },
  { id: "empleo", color: "mint" },
  { id: "cafe", color: "yellow" },
] as const;

export default function ContactForm() {
  const { t } = useLanguage();
  const [topic, setTopic] = useState<string>("proyecto");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<ContactErrorCode | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setError(null);
    try {
      const result = await sendContactMessage(data);
      if (result.ok) return setStatus("sent");
      setError(result.error);
    } catch {
      setError("send-failed");
    }
    setStatus("idle");
  };

  const reset = () => {
    setStatus("idle");
    setMessage("");
    setError(null);
    setTopic("proyecto");
  };

  return (
    <div className={`contact-form-window is-${status}`}>
      <span className="contact-tape" aria-hidden="true" />
      <div className="explorer-topbar"><div className="window-dots"><i /><i /><i /></div><span>{t.form.fileName}</span><span className="contact-form-status">{status === "sent" ? t.form.sent : t.form.unsaved}</span></div>

      {status === "sent" ? (
        <div className="contact-sent" role="status">
          <span className="contact-sent-stamp">✦</span>
          <h3>{t.form.sentTitle}</h3>
          <p>{t.form.sentText}</p>
          <button type="button" className="contact-again" onClick={reset}>{t.form.again}</button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <fieldset className="contact-topics">
            <legend>{t.form.topicsLegend}</legend>
            {topics.map((item) => (
              <label key={item.id} className={`topic-chip chip-${item.color}`}>
                <input type="radio" name="topic" value={item.id} checked={topic === item.id} onChange={() => setTopic(item.id)} />
                <span>{t.form.topics[item.id]}</span>
              </label>
            ))}
          </fieldset>

          <div className="contact-row">
            <label className="contact-field"><span>{t.form.name}</span><input name="name" type="text" required autoComplete="name" placeholder={t.form.namePlaceholder} /></label>
            <label className="contact-field"><span>{t.form.email}</span><input name="email" type="email" required autoComplete="email" placeholder={t.form.emailPlaceholder} /></label>
          </div>

          <label className="contact-field contact-message">
            <span>{t.form.message} <small>{message.length}/800</small></span>
            <textarea name="message" required maxLength={800} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder={t.form.messagePlaceholder} />
          </label>

          <label className="contact-trap" aria-hidden="true">website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>

          {error && <p className="contact-error" role="alert">{t.form.errors[error]}</p>}

          <div className="contact-form-footer">
            <p>{t.form.reply} <span aria-hidden="true">☕</span></p>
            <button type="submit" className="contact-submit" disabled={status === "sending"}>
              {status === "sending" ? t.form.sending : t.form.submit} <span aria-hidden="true">✉</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
