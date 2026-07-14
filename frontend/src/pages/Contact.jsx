import { assets } from "assets/assets";
import NewsLetterBox from "components/NewsletterBox";
import Title from "components/Title";
import React, { useEffect, useRef, useState } from "react";

/* Reusable fade-in on scroll */
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
};

const CONTACT_DETAILS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-[#8C7355]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-8-6.5-8-11a8 8 0 0116 0c0 4.5-8 11-8 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    label: "Address",
    value: "54709 Willms Station, Suite 350\nWashington, USA",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-[#8C7355]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "(45) 555-0132",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-[#8C7355]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    label: "Email",
    value: "admin@velora.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 text-[#8C7355]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    label: "Hours",
    value: "Mon–Fri: 9am – 6pm\nSat: 10am – 4pm",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // simulate send
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="pb-20">

      {/* ── Header ── */}
      <FadeIn className="text-center pt-12 pb-10">
        <Title text1="GET IN" text2="Touch" />
        <p className="mt-4 text-[13px] text-[#888] max-w-xs mx-auto leading-relaxed">
          We'd love to hear from you. Reach out and we'll get back to you promptly.
        </p>
      </FadeIn>

      {/* ── Main grid ── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20">

        {/* Left — image + details */}
        <FadeIn className="flex flex-col gap-6 lg:w-1/2" delay={0}>
          <div className="rounded-2xl overflow-hidden aspect-[16/9] lg:aspect-[4/3] bg-[#F2F0EC]">
            <img
              src={assets.contact_img}
              alt="Contact Velora"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-2 gap-3">
            {CONTACT_DETAILS.map((detail) => (
              <div
                key={detail.label}
                className="bg-white rounded-xl border border-black/8 p-4 shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-[#8C7355]/10 flex items-center justify-center mb-3">
                  {detail.icon}
                </div>
                <p className="text-[10px] tracking-[0.18em] text-[#8C7355] uppercase font-semibold mb-1">
                  {detail.label}
                </p>
                <p className="text-[12px] text-[#555] leading-relaxed whitespace-pre-line">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          {/* Careers */}
          <div className="bg-[#1A1A1A] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-['Playfair_Display',Georgia,serif] text-lg text-white mb-1">
                Careers at Velora
              </p>
              <p className="text-[12px] text-white/50">
                Learn more about our teams and open roles.
              </p>
            </div>
            <button className="flex-shrink-0 px-5 py-2.5 rounded-xl border border-white/20 text-[11px] tracking-[0.15em] text-white uppercase hover:bg-white hover:text-[#1A1A1A] transition-all duration-200">
              Explore Jobs
            </button>
          </div>
        </FadeIn>

        {/* Right — contact form */}
        <FadeIn className="lg:w-1/2" delay={120}>
          <div className="bg-white rounded-2xl border border-black/8 shadow-sm p-6 sm:p-8 h-full flex flex-col">
            <h3 className="font-['Playfair_Display',Georgia,serif] text-xl text-[#1A1A1A] mb-1">
              Send us a message
            </h3>
            <p className="text-[12px] text-[#888] mb-6">
              Fill out the form and we'll respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.18em] text-[#8C7355] font-semibold uppercase">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className="px-4 py-3 rounded-xl border border-black/10 text-[13px] text-[#1A1A1A] placeholder-[#BDBDBD] outline-none focus:border-[#8C7355] transition-colors duration-200 bg-[#FAF9F7]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.18em] text-[#8C7355] font-semibold uppercase">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="px-4 py-3 rounded-xl border border-black/10 text-[13px] text-[#1A1A1A] placeholder-[#BDBDBD] outline-none focus:border-[#8C7355] transition-colors duration-200 bg-[#FAF9F7]"
                />
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] tracking-[0.18em] text-[#8C7355] font-semibold uppercase">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="How can we help you?"
                  className="px-4 py-3 rounded-xl border border-black/10 text-[13px] text-[#1A1A1A] placeholder-[#BDBDBD] outline-none focus:border-[#8C7355] transition-colors duration-200 bg-[#FAF9F7] resize-none flex-1"
                />
              </div>

              <button
                type="submit"
                className={`mt-2 py-3.5 rounded-xl text-[11px] tracking-[0.2em] font-semibold uppercase transition-all duration-300 ${
                  sent
                    ? "bg-[#8C7355] text-white"
                    : "bg-[#1A1A1A] text-white hover:bg-[#333]"
                }`}
              >
                {sent ? "✓ Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;
