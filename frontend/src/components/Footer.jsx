import { assets } from "assets/assets";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const COMPANY_LINKS = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const POLICY_LINKS = [
  { label: "Privacy Policy" },
  { label: "Terms of Service" },
  { label: "Delivery Information" },
  { label: "Returns & Exchanges" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.23-5.22 1.23-5.22s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.54 1.9 1.85 0 3.09-2.37 3.09-5.17 0-2.14-1.44-3.63-3.51-3.63-2.39 0-3.79 1.79-3.79 3.64 0 .72.28 1.49.62 1.91.07.08.08.15.06.23-.06.26-.2.83-.23.94-.04.15-.13.18-.3.11-1.12-.52-1.82-2.17-1.82-3.49 0-2.84 2.06-5.44 5.94-5.44 3.12 0 5.55 2.22 5.55 5.19 0 3.09-1.95 5.58-4.65 5.58-.91 0-1.76-.47-2.05-1.03l-.56 2.08c-.2.77-.75 1.74-1.12 2.33.85.26 1.74.4 2.67.4 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4l16 16M4 20L20 4" />
      </svg>
    ),
  },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0E0E10] text-white pt-16 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8C7355]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-[5vw] md:px-[6vw] lg:px-[8vw]">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img
                src={assets.logo}
                alt="Velora"
                className="w-32 brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-xs text-white/60 leading-relaxed mb-6 max-w-[260px]">
              Velora defines modern luxury clothing and lifestyle accessories. Designed for individuals who appreciate effortless elegance and superior quality.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ label, icon }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#8C7355] hover:border-[#8C7355] hover:scale-105 transition-all duration-200"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#B59A75] uppercase mb-4">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {COMPANY_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className="text-xs text-white/60 hover:text-white transition-colors duration-150 flex items-center gap-1.5"
                  >
                    <span className="text-[10px] text-[#B59A75]">›</span>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#B59A75] uppercase mb-4">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-3">
              {POLICY_LINKS.map(({ label }) => (
                <li key={label}>
                  <button className="text-xs text-white/60 hover:text-white transition-colors duration-150 text-left flex items-center gap-1.5">
                    <span className="text-[10px] text-[#B59A75]">›</span>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-[#B59A75] uppercase mb-4">
              Concierge
            </h4>
            <div className="flex flex-col gap-3.5 text-xs text-white/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#B59A75] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>concierge@velora.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#B59A75] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>+1 (800) 555-0199</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#B59A75] flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>742 Fifth Avenue, New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 Velora Luxury Inc. All rights reserved.
          </p>

          {/* Payment badges */}
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX", "APPLE", "PAYPAL"].map((pm) => (
              <span
                key={pm}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold tracking-widest text-white/50"
              >
                {pm}
              </span>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span>Back to top</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
