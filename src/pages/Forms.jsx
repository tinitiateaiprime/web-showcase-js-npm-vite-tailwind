// src/Forms.jsx
import React, { useMemo, useState } from "react";

const initial = { name: "", email: "", message: "", hp: "" }; // hp = honeypot

export default function Forms() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    else if (values.name.trim().length < 2) e.name = "Name must be at least 2 characters.";

    const email = values.email.trim();
    if (!email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) e.email = "Enter a valid email address.";

    if (!values.message.trim()) e.message = "Message is required.";
    else if (values.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0 && !values.hp;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // block bots
    if (values.hp) return;

    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    try {
      setSubmitting(true);
      // simulate API call; replace with fetch('/api/contact', {method:'POST', body: JSON.stringify(values)})
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
      setValues(initial);
      setTouched({});
    } finally {
      setSubmitting(false);
    }
  }

  const fieldCls =
    "w-full rounded-md border border-indigo-200 bg-white p-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  const labelCls = "block mb-1 font-semibold text-indigo-900";
  const errorCls = "mt-1 text-sm text-red-600";

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-indigo-700">📝 Contact Form</h1>
        <p className="mt-2 text-slate-600">
          A clean, accessible form with client-side validation (no libraries).
        </p>

        {submitted && (
          <div
            role="status"
            className="mt-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-green-800"
          >
            ✅ Thanks! Your message was sent successfully.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 space-y-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-6 shadow-sm"
        >
          {/* Honeypot (anti-spam) */}
          <div className="hidden">
            <label>
              Do not fill this field:
              <input
                type="text"
                name="hp"
                value={values.hp}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className={labelCls}>
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your name"
              className={fieldCls + (touched.name && errors.name ? " border-red-400 ring-red-300" : "")}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={touched.name && errors.name ? "name-error" : undefined}
              required
            />
            {touched.name && errors.name && (
              <p id="name-error" className={errorCls}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelCls}>
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className={fieldCls + (touched.email && errors.email ? " border-red-400 ring-red-300" : "")}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? "email-error" : undefined}
              required
            />
            {touched.email && errors.email && (
              <p id="email-error" className={errorCls}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelCls}>
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your message"
              className={fieldCls + (touched.message && errors.message ? " border-red-400 ring-red-300" : "")}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={touched.message && errors.message ? "message-error" : undefined}
              required
            />
            {touched.message && errors.message && (
              <p id="message-error" className={errorCls}>
                {errors.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={!isValid || submitting}
              className={
                "rounded-md bg-indigo-700 px-5 py-2.5 font-medium text-white transition " +
                "hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 " +
                (!isValid || submitting ? "cursor-not-allowed opacity-60" : "")
              }
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => {
                setValues(initial);
                setTouched({});
                setSubmitted(false);
              }}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-slate-500" aria-live="polite">
            * All fields are required. We’ll never share your email.
          </p>
        </form>
      </div>
    </div>
  );
}
