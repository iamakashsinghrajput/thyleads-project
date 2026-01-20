"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ContactMode = "email" | "phone";

const ContactPage = () => {
  const [mode, setMode] = useState<ContactMode>("email");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (key: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, mode }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus("error");
      setErrorMessage(message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <main className="relative overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/15 blur-[160px] rounded-full" />
          <div className="absolute bottom-[-30%] right-1/4 w-[700px] h-[700px] bg-indigo-600/10 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-white/60">Contact us</p>
            <h1 className="mt-4 text-3xl md:text-5xl font-semibold">
              Start the pipeline conversation
            </h1>
            <p className="mt-4 text-white/70 text-base md:text-lg">
              Choose how you want to connect. The form stays the same, the channel changes.
            </p>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => setMode("email")}
              className={`px-6 py-3 rounded-full text-sm uppercase tracking-[0.2em] font-semibold border transition-all ${
                mode === "email"
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/70 hover:text-white"
              }`}
            >
              Contact via email
            </button>
            <button
              type="button"
              onClick={() => setMode("phone")}
              className={`px-6 py-3 rounded-full text-sm uppercase tracking-[0.2em] font-semibold border transition-all ${
                mode === "phone"
                  ? "bg-white text-black border-white"
                  : "border-white/20 text-white/70 hover:text-white"
              }`}
            >
              Contact via phone
            </button>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Selected channel
              </p>
              <p className="mt-2 text-lg font-semibold">
                {mode === "email" ? "Email" : "Phone"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">Full name</span>
                <input
                  type="text"
                  placeholder="Jane Carter"
                  value={formData.name}
                  onChange={updateField("name")}
                  required
                  className="rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">Company</span>
                <input
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={updateField("company")}
                  className="rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">Work email</span>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={updateField("email")}
                  required
                  className="rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">Phone</span>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={updateField("phone")}
                  className="rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">How can we help?</span>
                <textarea
                  rows={5}
                  placeholder="Tell us about your pipeline goals..."
                  value={formData.message}
                  onChange={updateField("message")}
                  required
                  className="rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                />
              </label>

              {status === "success" ? (
                <div className="md:col-span-2 flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Thanks!</h2>
                  <p className="text-xl md:text-2xl text-white/80 mb-6">We&apos;ll reach out shortly.</p>
                  <p className="text-white/50 text-sm">Check your inbox for a confirmation email.</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 rounded-full border border-white/20 text-white/70 px-6 py-2 text-sm hover:border-white/40 hover:text-white transition"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
                  <div className="text-sm text-red-400">
                    {status === "error" && errorMessage}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="rounded-full bg-white text-black px-8 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-white/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting"
                      ? "Sending..."
                      : `Request contact via ${mode === "email" ? "email" : "phone"}`}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
