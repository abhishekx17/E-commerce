import { assets } from "assets/assets";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: assets.hero_img,
    tagline: "New Season · 2025",
    title: "Latest\nArrivals",
    cta: "Shop Now",
    ctaLink: "/collection",
  },
  {
    image: assets.hero_img2 || assets.hero_img,
    tagline: "Curated Styles",
    title: "Fresh\nEvery Day",
    cta: "Explore",
    ctaLink: "/collection",
  },
  {
    image: assets.hero_img3 || assets.hero_img,
    tagline: "Limited Time",
    title: "Up to\n40% Off",
    cta: "View Deals",
    ctaLink: "/collection",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [textKey, setTextKey] = useState(0);

  const goTo = useCallback(
    (index) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTextKey((k) => k + 1);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating]
  );

  const nextSlide = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prevSlide = () => {
    goTo((current - 1 + slides.length) % slides.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden bg-[#FAF9F7]" style={{ minHeight: "420px" }}>

      {/* Slides track */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex flex-col sm:flex-row w-full flex-shrink-0">

            {/* ── Left: text panel ── */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-16 px-8 sm:px-12 lg:px-16 bg-[#FAF9F7] order-2 sm:order-1">
              <div
                key={index === current ? textKey : index}
                className="max-w-sm text-center sm:text-left"
                style={{
                  animation: index === current ? "heroFadeUp 0.6s ease-out both" : "none",
                }}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-2.5 justify-center sm:justify-start mb-5">
                  <span className="h-px w-8 bg-[#8C7355]" />
                  <span className="text-[10px] tracking-[0.25em] text-[#8C7355] font-medium uppercase whitespace-nowrap">
                    {slide.tagline}
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="font-['Playfair_Display',Georgia,serif] text-[2.4rem] sm:text-[2.8rem] lg:text-[3.6rem] leading-[1.08] text-[#1A1A1A] mb-6 tracking-tight whitespace-pre-line"
                >
                  {slide.title}
                </h1>

                {/* CTA */}
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-3 group"
                >
                  <span className="text-[11px] tracking-[0.22em] font-semibold uppercase text-[#1A1A1A] group-hover:text-[#8C7355] transition-colors duration-200">
                    {slide.cta}
                  </span>
                  <span className="h-px bg-[#1A1A1A] group-hover:bg-[#8C7355] transition-all duration-300 w-8 group-hover:w-14" />
                </Link>
              </div>
            </div>

            {/* ── Right: image panel ── */}
            <div className="w-full sm:w-1/2 h-[260px] sm:h-[520px] lg:h-[600px] overflow-hidden order-1 sm:order-2">
              <img
                className="w-full h-full object-cover transition-transform duration-[6000ms] ease-linear scale-[1.04] hover:scale-[1.06]"
                src={slide.image}
                alt={slide.title}
                style={{ transform: index === current ? "scale(1)" : "scale(1.04)" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Nav arrows ── */}
      {[
        { dir: "prev", onClick: prevSlide, icon: "‹", position: "left-4" },
        { dir: "next", onClick: nextSlide, icon: "›", position: "right-4" },
      ].map(({ dir, onClick, icon, position }) => (
        <button
          key={dir}
          onClick={onClick}
          aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
          className={`absolute ${position} top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 flex items-center justify-center text-[#1A1A1A] text-2xl shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-200 hover:scale-105 active:scale-95`}
        >
          {icon}
        </button>
      ))}

      {/* ── Progress dots ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-400 ${
              current === index
                ? "w-6 h-1.5 bg-[#1A1A1A]"
                : "w-1.5 h-1.5 bg-[#1A1A1A]/25 hover:bg-[#1A1A1A]/50"
            }`}
          />
        ))}
      </div>

      {/* ── Keyframe style ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Hero;