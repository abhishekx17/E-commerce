import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="bg-[#1A1A1A] rounded-2xl py-12 sm:py-14 px-6 sm:px-12 text-center">
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-px w-8 bg-[#8C7355]" />
        <span className="text-[10px] tracking-[0.25em] text-[#8C7355] font-medium uppercase">
          Newsletter
        </span>
        <span className="h-px w-8 bg-[#8C7355]" />
      </div>

      <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl text-white mb-3">
        Get 20% off your first order
      </h2>
      <p className="text-[12px] sm:text-[13px] text-white/50 max-w-sm mx-auto leading-relaxed mb-7">
        Join the Velora community and be the first to know about new arrivals, exclusive deals, and style picks curated just for you.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col xs:flex-row items-stretch gap-2 max-w-md mx-auto"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white text-[13px] placeholder-white/35 outline-none focus:border-[#8C7355] transition-colors duration-200"
        />
        <button
          type="submit"
          className={`flex-shrink-0 px-6 py-3 rounded-xl text-[11px] tracking-[0.18em] font-semibold uppercase transition-all duration-300 ${
            sent
              ? "bg-[#8C7355] text-white"
              : "bg-white text-[#1A1A1A] hover:bg-[#FAF9F7]"
          }`}
        >
          {sent ? "✓ Subscribed!" : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
