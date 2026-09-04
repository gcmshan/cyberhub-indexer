"use client";

import React, { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [type, setType] = useState("Bug Report");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "bc197458-8f3e-4884-aa42-f3b1d313fa15",
          subject: `CyberHub Feedback: ${type}`,
          from_name: "CyberHub User",
          feedback_type: type,
          user_email: email || "Not Provided",
          message: message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
          setEmail("");
          onClose();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-white mb-1">📢 Feedback & Bug Report</h2>
        <p className="text-xs text-slate-400 mb-4">
          Found an issue or have a suggestion? Let us know.
        </p>

        {status === "success" ? (
          <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 p-4 rounded-xl text-center text-sm font-semibold my-6">
            🎉 Thank you! Your feedback has been sent successfully.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Bug Report">🐛 Bug Report (Broken links, UI issues)</option>
                <option value="Game Request">🎮 Game Request</option>
                <option value="General Feedback">💡 General Suggestion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Your Email <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or feedback here..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              ></textarea>
            </div>

            {status === "error" && (
              <p className="text-xs text-rose-400 text-center">
                Failed to send message. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Submit Report"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}