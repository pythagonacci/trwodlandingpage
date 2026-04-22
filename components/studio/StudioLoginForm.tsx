"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendStudioMagicLink, type LoginState } from "@/app/(studio-auth)/studio/login/actions";

const INITIAL_STATE: LoginState = {
  ok: false,
  message: ""
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-full bg-[var(--ink)] px-5 py-3 text-[13px] font-semibold text-white transition hover:bg-[var(--ink-2)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Sending link..." : "Send secure sign-in link"}
    </button>
  );
}

export function StudioLoginForm({ next }: { next: string }) {
  const [state, formAction] = useFormState(sendStudioMagicLink, INITIAL_STATE);

  return (
    <form action={formAction} className="mt-8">
      <input type="hidden" name="next" value={next} />
      <label className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-3">
        Admin email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-[rgba(144,144,144,0.26)] bg-white px-4 py-3 text-[15px] font-normal normal-case tracking-normal text-ink outline-none transition focus:border-accent"
          placeholder="you@company.com"
        />
      </label>
      <SubmitButton />
      {state.message ? (
        <p className={`mt-4 text-[13px] ${state.ok ? "text-ink-3" : "text-[#b42318]"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
