"use client";

import { useState } from "react";

export default function ShareButton() {
  const [status, setStatus] = useState("Share link");

  async function handleShare() {
    const currentUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: currentUrl
        });
        setStatus("Shared");
      } else {
        await navigator.clipboard.writeText(currentUrl);
        setStatus("Copied");
      }
    } catch {
      setStatus("Try again");
    }

    window.setTimeout(() => setStatus("Share link"), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="soft-button inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      {status}
    </button>
  );
}
