"use client";

import { useActionState, useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { loginAdminAction } from "@/lib/actions";

const initialState = {
  error: ""
};

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
        <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 6.3A11.6 11.6 0 0 1 12 6c6.4 0 10 6 10 6a18.4 18.4 0 0 1-4 4.8" />
      <path d="M6.7 6.7C4 8.4 2 12 2 12a18.7 18.7 0 0 0 10 6 10.7 10.7 0 0 0 5.1-1.3" />
      <path d="M9.9 9.9A3 3 0 0 0 12 15a3 3 0 0 0 2.1-.9" />
    </svg>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAdminAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="h-12 w-full rounded-2xl border border-border bg-transparent px-4 text-sm outline-none transition focus:border-accent"
          placeholder="admin@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="h-12 w-full rounded-2xl border border-border bg-transparent px-4 pr-12 text-sm outline-none transition focus:border-accent"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute inset-y-0 right-3 inline-flex items-center justify-center text-muted transition hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
      </div>

      {state?.error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 dark:text-red-200">
          {state.error}
        </div>
      ) : null}

      <SubmitButton label="Sign in" pendingLabel="Signing in..." className="w-full" />
    </form>
  );
}
