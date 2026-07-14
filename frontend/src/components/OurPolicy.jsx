import { assets } from "assets/assets";
import React, { useEffect, useRef, useState } from "react";

const POLICIES = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange",
    desc: "Hassle-free exchange within 7 days on all orders",
  },
  {
    icon: assets.quality_icon,
    title: "7-Day Returns",
    desc: "Free returns, no questions asked",
  },
  {
    icon: assets.support_img,
    title: "24/7 Support",
    desc: "Our team is here whenever you need us",
  },
];

const OurPolicy = () => {
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
    <section ref={ref} className="py-16">
      <div className="h-px bg-gradient-to-r from-transparent via-[#8C7355]/20 to-transparent mb-16" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {POLICIES.map((policy, i) => (
          <div
            key={policy.title}
            className="flex flex-col items-center text-center bg-white rounded-2xl border border-black/8 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms, box-shadow 0.3s, translate 0.3s`,
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-[#8C7355]/10 flex items-center justify-center mb-4">
              <img src={policy.icon} alt={policy.title} className="w-6 opacity-80" />
            </div>
            <p className="font-['Playfair_Display',Georgia,serif] text-[15px] text-[#1A1A1A] mb-2">
              {policy.title}
            </p>
            <p className="text-[12px] text-[#888] leading-relaxed">{policy.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;
