import { assets } from "assets/assets";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const COMPANY_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/collection", label: "Collection" },
  { to: "/contact", label: "Contact" },
];

const POLICY_LINKS = [
  { label: "Privacy Policy" },
  { label: "Terms of Service" },
  { label: "Delivery Info" },
  { label: "Returns & Exchanges" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.23-5.22 1.23-5.22s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.54 1.9 1.85 0 3.09-2.37 3.09-5.17 0-2.14-1.44-3.63-3.51-3.63-2.39 0-3.79 1.79-3.79 3.64 0 .72.28 1.49.62 1.91.07.08.08.15.06.23-.06.26-.2.83-.23.94-.04.15-.13.18-.3.11-1.12-.52-1.82-2.17-1.82-3.49 0-2.84 2.06-5.44 5.94-5.44 3.12 0 5.55 2.22 5.55 5.19 0 3.09-1.95 5.58-4.65 5.58-.91 0-1.76-.47-2.05-1.03l-.56 2.08c-.2.77-.75 1.74-1.12 2.33.85.26 1.74.4 2.67.4 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l16 16M4 20L20 4" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] mt-20">
      {/* ── Main footer grid ── */}
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Velora"
                className="w-32 mb-5 brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-[12px] text-white/45 leading-relaxed mb-6 max-w-[220px]">
              Your destination for quality fashion and lifestyle products — curated from trusted brands, delivered fairly.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#8C7355] transition-all duration-200"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <p className="text-[10px] tracking-[0.22em] font-semibold text-[#8C7355] uppercase mb-5">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className="text-[12px] text-white/50 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <p className="text-[10px] tracking-[0.22em] font-semibold text-[#8C7355] uppercase mb-5">
              Policies
            </p>
            <ul className="flex flex-col gap-2.5">
              {POLICY_LINKS.map(({ label }) => (
                <li key={label}>
                  <button className="text-[12px] text-white/50 hover:text-white transition-colors duration-150 text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.22em] font-semibold text-[#8C7355] uppercase mb-5">
              Get In Touch
            </p>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 flex-shrink-0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" />
                    </svg>
                  ),
                  text: "admin@velora.com",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 flex-shrink-0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 013.08 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  ),
                  text: "(45) 555-0132",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 flex-shrink-0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-8-6.5-8-11a8 8 0 0116 0c0 4.5-8 11-8 11z" /><circle cx="12" cy="10" r="2.5" />
                    </svg>
                  ),
                  text: "54709 Willms Station,\nWashington, USA",
                },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-2.5 text-[12px] text-white/45 leading-relaxed">
                  <span className="text-[#8C7355] mt-0.5">{icon}</span>
                  <span className="whitespace-pre-line">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30 tracking-wide">
            © 2026 Velora. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-white/20 tracking-wide">Made with</span>
            <svg viewBox="0 0 16 16" fill="#8C7355" className="w-3 h-3 opacity-60">
              <path d="M8 14s-6-3.85-6-7.5a4 4 0 018 0 4 4 0 018 0C18 10.15 8 14 8 14z" />
            </svg>
            <span className="text-[11px] text-white/20 tracking-wide">for fashion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
