"use client";

import { useFormStatus } from "react-dom";

export default function DeletePostButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!window.confirm("Delete this poem from the gallery?")) {
          event.preventDefault();
        }
      }}
      disabled={pending}
      className="rounded-full border border-red-400/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:opacity-60"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
