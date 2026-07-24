import React from "react";

const ProductSkeleton = ({ count = 5 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-2.5 border border-black/[0.04] shadow-sm animate-pulse flex flex-col"
        >
          {/* Skeleton Image */}
          <div className="w-full aspect-[3/4] rounded-xl bg-slate-200/70" />

          {/* Skeleton Text */}
          <div className="mt-3 px-1 space-y-2">
            <div className="h-3 w-16 bg-slate-200/70 rounded-full" />
            <div className="h-4 w-full bg-slate-200/70 rounded-md" />
            <div className="flex items-center justify-between pt-1">
              <div className="h-4 w-12 bg-slate-200/70 rounded-md" />
              <div className="h-3 w-10 bg-slate-200/70 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
