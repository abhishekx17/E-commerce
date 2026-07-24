import { assets } from "assets/assets";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: assets.hero_img,
    badge: "COLLECTION 2025",
    tagline: "Autumn / Winter Edit",
    title: "Timeless\nElegance",
    description: "Discover handcrafted silhouettes designed for sophisticated everyday luxury.",
    cta: "Explore Collection",
    ctaLink: "/collection",
  },
  {
    image: assets.hero_img2 || assets.hero_img,
    badge: "NEW ARRIVALS",
    tagline: "Minimalist Aesthetic",
    title: "Modern\nEssentials",
    description: "Curated wardrobe staples crafted with sustainable premium materials.",
    cta: "Shop Essentials",
    ctaLink: "/collection",
  },
  {
    image: assets.hero_img3 || assets.hero_img,
    badge: "EXCLUSIVE DEALS",
    tagline: "Limited Release",
    title: "The Signature\nSeries",
    description: "Enjoy up to 30% off selected luxury footwear and tailored outer coats.",
    cta: "View Limited Deals",
    ctaLink: "/collection",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Carousel autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#FAF9F6] border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] mb-12">
      
      {/* ── Slides Container ── */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === current;

          return (
            <div
              key={index}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className={`absolute inset-0 w-full h-full flex flex-col lg:flex-row transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              {/* Left Column: Text & Content */}
              <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 z-10 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6] to-transparent">
                <div
                  className={`max-w-md w-full transition-all duration-700 delay-200 transform ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  {/* Badge & Tagline */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-[#8C7355] bg-[#8C7355]/10 border border-[#8C7355]/20 uppercase">
                      {slide.badge}
                    </span>
                    <span className="h-px w-6 bg-[#8C7355]/40" />
                    <span className="text-xs font-semibold tracking-wider text-[#666] uppercase">
                      {slide.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl text-[#121212] leading-[1.1] mb-5 tracking-tight whitespace-pre-line">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#555] leading-relaxed mb-8 max-w-sm">
                    {slide.description}
                  </p>

                  {/* Call to Action Button */}
                  <div className="flex items-center gap-4">
                    <Link
                      to={slide.ctaLink}
                      className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#121212] text-white text-xs font-semibold uppercase tracking-wider overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95"
                    >
                      <span className="relative z-10">{slide.cta}</span>
                      <svg className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <div className="absolute inset-0 bg-[#8C7355] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Link>

                    <Link
                      to="/collection"
                      className="px-5 py-3.5 rounded-full border border-black/15 text-xs font-semibold uppercase tracking-wider text-[#121212] hover:bg-black/5 transition-colors"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Image with subtle Ken Burns zoom */}
              <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-full relative overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#FAF9F6] lg:via-transparent lg:to-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Slide Controls & Indicators ── */}
      <div className="absolute bottom-6 left-8 right-8 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Slide Counter (01 / 03) */}
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/60 shadow-sm pointer-events-auto">
          <span className="text-xs font-bold text-[#121212]">
            0{current + 1}
          </span>
          <span className="text-xs text-[#999]">/</span>
          <span className="text-xs font-medium text-[#777]">
            0{slides.length}
          </span>
        </div>

        {/* Progress Bar Dots */}
        <div className="hidden sm:flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-sm pointer-events-auto">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === idx ? "w-8 bg-[#8C7355]" : "w-2 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Glass Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-3 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-md text-[#121212] hover:bg-white hover:scale-105 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-3 rounded-full bg-white/80 backdrop-blur-md border border-white/80 shadow-md text-[#121212] hover:bg-white hover:scale-105 active:scale-95 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;