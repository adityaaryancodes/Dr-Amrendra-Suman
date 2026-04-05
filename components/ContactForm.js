"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { submitContactAction } from "@/lib/actions";

const initialState = {
  error: "",
  success: ""
};

export default function ContactForm({ authorEmail }) {
  const [state, formAction] = useActionState(submitContactAction, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-[24px] bg-surface p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="h-12 w-full rounded-2xl bg-background px-4 text-sm outline-none transition focus:bg-white"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="h-12 w-full rounded-2xl bg-background px-4 text-sm outline-none transition focus:bg-white"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          className="h-12 w-full rounded-2xl bg-background px-4 text-sm outline-none transition focus:bg-white"
          placeholder="Collaboration, feedback, publishing..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          className="w-full rounded-[20px] bg-background px-4 py-3 text-sm leading-7 outline-none transition focus:bg-white"
          placeholder="Write your message here..."
        />
      </div>

      {state.error ? <div className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">{state.error}</div> : null}
      {state.success ? (
        <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">{state.success}</div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton label="Send message" pendingLabel="Sending..." />
        {authorEmail ? <p className="text-sm text-muted">Or email directly at {authorEmail}</p> : null}
      </div>
    </form>
  );
}
