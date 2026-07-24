import React, { useState } from "react";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#121212] via-[#1a1815] to-[#2b241c] text-white p-8 sm:p-12 lg:p-16 text-center shadow-2xl my-12 border border-white/10">
      
      {/* ── Ambient Radial Glow background ── */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#8C7355]/20 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#B59A75]/15 blur-3xl pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 max-w-xl mx-auto">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold tracking-widest text-[#B59A75] uppercase mb-5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B59A75] animate-ping" />
          Velora Insider Club
        </div>

        {/* Heading */}
        <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 tracking-tight">
          Unlock 20% Off Your First Purchase
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
          Subscribe to receive private invitations to new collection drops, insider styling guides, and exclusive seasonal offers.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <div className="relative w-full sm:flex-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm placeholder:text-white/40 focus:outline-none focus:border-[#B59A75] focus:ring-1 focus:ring-[#B59A75] transition-all"
            />
          </div>

          <button
            type="submit"
            className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
              submitted
                ? "bg-emerald-600 text-white"
                : "bg-white text-[#121212] hover:bg-[#B59A75] hover:text-white active:scale-95"
            }`}
          >
            {submitted ? (
              <>
                <span>✓ Subscribed!</span>
              </>
            ) : (
              <>
                <span>Subscribe</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Reassurance */}
        <p className="mt-4 text-[10px] text-white/40 tracking-wider uppercase">
          🔒 No Spam • Unsubscribe at any time
        </p>
      </div>
    </div>
  );
};

export default NewsletterBox;
