import React from "react";

const POLICIES = [
  {
    title: "Seamless Exchanges",
    desc: "Hassle-free size or style exchange policy within 14 days.",
    icon: (
      <svg className="w-6 h-6 text-[#8C7355] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: "7 Days Free Returns",
    desc: "Complimentary return shipping on all eligible order returns.",
    icon: (
      <svg className="w-6 h-6 text-[#8C7355] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "24/7 Dedicated Support",
    desc: "Our concierge team is available around the clock to assist you.",
    icon: (
      <svg className="w-6 h-6 text-[#8C7355] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Encrypted Payments",
    desc: "Bank-grade 256-bit SSL encryption protecting every transaction.",
    icon: (
      <svg className="w-6 h-6 text-[#8C7355] group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

const OurPolicy = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {POLICIES.map((item, index) => (
          <div
            key={index}
            className="group p-6 rounded-2xl bg-white border border-black/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:border-black/20 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center cursor-default"
          >
            {/* Icon Container with fixed high-contrast hover color */}
            <div className="w-14 h-14 rounded-2xl bg-[#8C7355]/10 border border-[#8C7355]/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#121212] group-hover:border-[#121212] group-hover:scale-110 shadow-sm">
              {item.icon}
            </div>

            {/* Title */}
            <h4 className="text-sm font-bold text-[#121212] mb-1.5 tracking-wide">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-xs text-[#777] leading-relaxed max-w-[220px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
