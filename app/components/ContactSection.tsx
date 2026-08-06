"use client";

import { FormEvent, useState } from "react";

export default function ContactSection() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/trey.mcgarity99@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject,
          message: body,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setSubject("");
      setBody("");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="rounded-[28px] border border-white/10 bg-[#162230] p-8 shadow-xl shadow-black/20 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[--accent]">Contact</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Let&apos;s build something useful together</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[--text-muted]">
            If you have a product idea, a team need, or a role that fits this kind of work, I’d love to hear about it.
          </p>
        </div>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-[#192534] p-5 sm:p-6">
            <div>
              <label htmlFor="subject" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[--accent]">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                required
                maxLength={120}
                className="w-full rounded-xl border border-white/15 bg-[#0f1a26] px-4 py-3 text-sm text-[--text-primary] outline-none transition placeholder:text-[--text-muted]/70 focus:border-[--accent]/50"
                placeholder="What would you like to discuss?"
              />
            </div>

            <div>
              <label htmlFor="body" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[--accent]">
                Body
              </label>
              <textarea
                id="body"
                name="message"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                required
                rows={6}
                className="w-full resize-y rounded-xl border border-white/15 bg-[#0f1a26] px-4 py-3 text-sm leading-7 text-[--text-primary] outline-none transition placeholder:text-[--text-muted]/70 focus:border-[--accent]/50"
                placeholder="Share details about your project, role, or idea."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[--accent] px-5 py-3 text-sm font-semibold text-[--bg-alt] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>

            {status === "success" ? (
              <p className="text-sm text-emerald-300">Message sent successfully.</p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-rose-300">Unable to send right now. Please try again.</p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
