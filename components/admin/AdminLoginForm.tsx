"use client";

import { useState, useTransition } from "react";
import { sendMagicLink } from "@/app/admin/login/actions";

type AdminLoginFormProps = {
  initialError?: string;
};

export function AdminLoginForm({ initialError }: AdminLoginFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState(initialError ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setMessage("");

    startTransition(async () => {
      const result = await sendMagicLink(email);

      if (!result.success) {
        setStatus("error");
        setMessage(result.error ?? "Unable to send magic link.");
        return;
      }

      setStatus("success");
      setMessage("Check your email for a magic link.");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-ink-2">
          Admin email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="w-full rounded-2xl border border-cream-3 bg-[rgba(255,255,255,0.88)] px-4 py-3 text-base text-ink outline-none transition focus:border-stone focus:ring-2 focus:ring-[rgba(154,145,132,0.18)]"
        />
      </div>

      {message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-[rgba(29,78,216,0.22)] bg-accent-bg text-accent"
              : "border-[rgba(154,145,132,0.24)] bg-cream-2 text-ink-2"
          }`}
        >
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Sending..." : "Send magic link"}
      </button>
    </form>
  );
}
