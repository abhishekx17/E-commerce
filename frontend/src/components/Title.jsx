import React from "react";

/* Unified section title — matches warm luxury palette */
const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-1">
      <div className="flex items-center gap-2.5">
        <span className="h-px w-6 sm:w-8 bg-[#8C7355]" />
        <p className="text-[10px] sm:text-[11px] tracking-[0.25em] text-[#8C7355] font-medium uppercase whitespace-nowrap">
          {text1}
        </p>
        <span className="h-px w-6 sm:w-8 bg-[#8C7355]" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-['Playfair_Display',Georgia,serif] font-medium text-[#1A1A1A] tracking-tight">
        {text2}
      </h2>
    </div>
  );
};

export default Title;
