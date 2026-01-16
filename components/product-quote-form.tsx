"use client";

import { useState } from "react";

export default function ProductQuoteForm({ product }: { product: string }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          company,
          country,
          product,
          quantity,
          message,
        }),
      });

      if (!res.ok) throw new Error("RFQ failed");

      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 你的 input 保持原样，只要 onChange 绑定到上面的 state */}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#d6b676] text-black py-3 rounded"
      >
        {loading ? "Submitting..." : "Request Quote for This Product"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-600">
          Thank you! Your request has been sent. We will reply within 24 hours.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-600">
          Submission failed. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
