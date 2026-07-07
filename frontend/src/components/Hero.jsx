// import { assets } from "assets/assets";
// import React from "react";

// const Hero = () => {
//   return (
//     <div className="flex flex-col sm:flex-row border border-gray-400">
//       {/* Hero Left Side */}
//       <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ">
//       <div className="text-[#414141]">
//         <div className="flex items-center gap-2">
//             <p className="w-8 md:w-11 h-[2px] bg-[#424242]"></p>
//             <p className="font-medium text-sm md:text-base">Our BEST SELLER</p>
//         </div>
//         <h1 className=" prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>
//         <div className="flex items-center gap-2">
//             <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
//             <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
//         </div>
//       </div>
//       </div>
//       {/* Hero right side */}
//       <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
//     </div>
//   );
// };

// export default Hero;


import { assets } from "assets/assets";
import React, { useState, useEffect, useCallback } from "react";

const slides = [
  {
    image: assets.hero_img,
    tagline: "Our Best Seller",
    title: "Latest Arrivals",
  },
  {
    image: assets.hero_img2 || assets.hero_img,
    tagline: "New Season",
    title: "Fresh Styles Daily",
  },
  {
    image: assets.hero_img3 || assets.hero_img,
    tagline: "Limited Time",
    title: "Up To 40% Off",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden border border-gray-200">
      {/* Slides track */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row w-full flex-shrink-0"
          >
            {/* Left text side */}
<div className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-0 bg-white px-6 sm:px-8">
  <div className="text-[#414141] text-center sm:text-left max-w-xs sm:max-w-sm">
    <div className="flex items-center gap-2 justify-center sm:justify-start">
      <p className="w-8 md:w-11 h-[2px] bg-[#424242]" />
      <p className="font-medium text-xs sm:text-sm md:text-base tracking-wide whitespace-nowrap">
        {slide.tagline}
      </p>
    </div>
    <h1 className="prata-regular text-2xl sm:text-3xl py-2 sm:py-3 lg:text-5xl leading-snug sm:leading-relaxed break-words">
      {slide.title}
    </h1>
    <div className="flex items-center gap-2 justify-center sm:justify-start">
      <p className="font-semibold text-xs sm:text-sm md:text-base cursor-pointer hover:tracking-wide transition-all">
        SHOP NOW
      </p>
      <p className="w-8 md:w-11 h-[1px] bg-[#414141]" />
    </div>
  </div>
</div>

            {/* Right image side */}
            <div className="w-full sm:w-1/2 h-[300px] sm:h-auto">
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt={slide.title}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#414141] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#414141] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? "w-6 bg-[#414141]" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;