"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send message.");
      }

      setForm(initialState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <Reveal variant="fadeUp" delay={0.12}>
      <form
        onSubmit={handleSubmit}
        className="border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 ease-out hover:border-white/15 md:p-10"
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
        </div>

        <div className="grid gap-6">
          <Field label="Name" required>
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={inputClassName}
            />
          </Field>

          <Field label="Email" required>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={inputClassName}
            />
          </Field>

          <Field label="Phone">
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={inputClassName}
            />
          </Field>

          <Field label="Message" required>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={`${inputClassName} resize-y`}
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-8 inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-white transition-all duration-300 ease-out hover:gap-5 hover:text-accent disabled:opacity-50"
        >
          <span className="h-px w-10 bg-white/80 transition-all duration-300 group-hover:w-14" />
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="mt-4 text-sm text-accent transition-opacity duration-300">
            Thank you. Your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-400 transition-opacity duration-300">
            {errorMessage}
          </p>
        )}
      </form>
    </Reveal>
  );
}

function Field({
  label,
  children,
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.24em] text-muted uppercase">
        {label}
        {required ? " *" : ""}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClassName =
  "w-full border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-all duration-300 ease-out focus:border-accent focus:bg-black/60";
