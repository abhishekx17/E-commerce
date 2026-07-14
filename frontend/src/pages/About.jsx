import { assets } from "assets/assets";
import NewsLetterBox from "components/NewsletterBox";
import Title from "components/Title";
import React, { useEffect, useRef, useState } from "react";

/* Animated section wrapper */
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
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
      }}
    >
      {children}
    </div>
  );
};

const WHY_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#8C7355]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
      </svg>
    ),
    title: "Quality Assurance",
    desc: "Every product on Velora goes through a thorough review before it reaches you. We work only with trusted suppliers and check each item against strict quality standards.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#8C7355]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    title: "Convenience",
    desc: "We built Velora around one idea: shopping should not be complicated. From browsing to checkout to delivery, every step is designed to save you time.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#8C7355]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: "Exceptional Support",
    desc: "Our support team is here whenever you need them. Whether it is a question before you buy or a concern after delivery, we respond fast and stay with you.",
  },
];

const About = () => {
  return (
    <div className="pb-20">

      {/* ── Hero header ── */}
      <FadeIn className="text-center pt-12 pb-10">
        <Title text1="ABOUT" text2="Our Story" />
        <p className="mt-4 text-[13px] text-[#888] max-w-sm mx-auto leading-relaxed">
          Crafted with passion. Delivered with care.
        </p>
      </FadeIn>

      {/* ── Story section ── */}
      <FadeIn className="flex flex-col md:flex-row gap-10 lg:gap-16 mb-20" delay={100}>
        {/* Image */}
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto bg-[#F2F0EC]">
          <img
            src={assets.about_img}
            alt="About Velora"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center gap-5 md:w-1/2">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#8C7355]" />
            <span className="text-[10px] tracking-[0.22em] text-[#8C7355] font-medium uppercase">
              Since 2020
            </span>
          </div>

          <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl text-[#1A1A1A] leading-snug">
            Born from a passion<br className="hidden sm:block" /> for great style.
          </h2>

          <p className="text-[13px] text-[#666] leading-relaxed">
            Velora was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>

          <p className="text-[13px] text-[#666] leading-relaxed">
            Since our inception, we've worked tirelessly to create a diverse selection of high-quality products that cater to every taste and preference — from fashion and beauty to home essentials, all sourced from trusted brands.
          </p>

          {/* Mission callout */}
          <div className="mt-2 bg-[#FAF9F7] border border-[#8C7355]/20 rounded-xl p-5">
            <p className="text-[11px] tracking-[0.2em] text-[#8C7355] font-semibold uppercase mb-2">
              Our Mission
            </p>
            <p className="text-[13px] text-[#555] leading-relaxed">
              At Velora, our mission is to make great style accessible to everyone. We believe shopping should feel good from start to finish — well-made products at honest prices, with an experience that actually makes sense.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#8C7355]/20 to-transparent mb-16" />

      {/* ── Why choose us ── */}
      <FadeIn className="text-center mb-10" delay={0}>
        <Title text1="WHY" text2="Choose Us" />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-20">
        {WHY_ITEMS.map((item, i) => (
          <FadeIn key={item.title} delay={i * 100}>
            <div className="bg-white rounded-2xl border border-black/8 p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#8C7355]/10 flex items-center justify-center mb-4">
              {item.icon}
            </div>
              <h3 className="font-['Playfair_Display',Georgia,serif] text-[17px] text-[#1A1A1A] mb-3">
                {item.title}
              </h3>
              <p className="text-[12px] text-[#888] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* ── Stats strip ── */}
      <FadeIn delay={150}>
        <div className="bg-[#1A1A1A] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row justify-around gap-8 mb-20 text-center">
          {[
            { value: "52K+", label: "Happy Customers" },
            { value: "4.8", label: "Average Rating", star: true },
            { value: "500+", label: "Products" },
            { value: "7-Day", label: "Free Returns" },
          ].map(({ value, label, star }) => (
            <div key={label}>
              <div className="flex items-center justify-center gap-1.5">
                <p className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl text-white">
                  {value}
                </p>
                {star && (
                  <svg viewBox="0 0 16 16" fill="#8C7355" className="w-4 h-4 mb-0.5">
                    <path d="M8 1l1.8 4.1H14l-3.4 2.6 1.3 4.3L8 9.6l-3.9 2.4 1.3-4.3L2 5.1h4.2z" />
                  </svg>
                )}
              </div>
              <p className="text-[11px] tracking-[0.18em] text-white/50 uppercase">{label}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <NewsLetterBox />
    </div>
  );
};

export default About;
