import { ShopContext } from "context/ShopContext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const [added, setAdded] = useState(false);

  const mainImg = Array.isArray(image) ? image[0] : image;
  const hoverImg = Array.isArray(image) && image[1] ? image[1] : mainImg;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, "M");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col cursor-pointer bg-white rounded-2xl p-2.5 border border-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      
      {/* ── Image Wrapper ── */}
      <Link
        to={`/product/${id}`}
        onClick={() => scrollTo(0, 0)}
        className="relative block w-full aspect-[3/4] overflow-hidden rounded-xl bg-[#F5F4F0]"
      >
        {/* Main Image */}
        <img
          src={mainImg}
          alt={name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-108 ${
            hoverImg !== mainImg ? "group-hover:opacity-0" : ""
          }`}
        />

        {/* Hover Image (if present) */}
        {hoverImg !== mainImg && (
          <img
            src={hoverImg}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:scale-108"
          />
        )}

        {/* Quick Add Button Overlay */}
        <button
          onClick={handleQuickAdd}
          aria-label="Quick Add to Cart"
          className={`absolute bottom-3 left-3 right-3 z-10 py-2.5 px-3 rounded-xl backdrop-blur-md text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
            added
              ? "bg-emerald-600 text-white opacity-100 translate-y-0"
              : "bg-white/90 text-[#121212] hover:bg-[#121212] hover:text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          }`}
        >
          {added ? (
            <>
              <span>✓ Added</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Quick Add</span>
            </>
          )}
        </button>
      </Link>

      {/* ── Product Info ── */}
      <Link
        to={`/product/${id}`}
        onClick={() => scrollTo(0, 0)}
        className="mt-3 px-1 flex flex-col flex-1 justify-between"
      >
        <div>
          {/* Rating stars */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex text-amber-500 text-[10px]">
              {"★".repeat(5)}
            </div>
            <span className="text-[10px] text-[#888] font-medium">(4.9)</span>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-[13px] text-[#121212] font-semibold line-clamp-1 group-hover:text-[#8C7355] transition-colors">
            {name}
          </h3>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-[#8C7355]">
            {currency}{price}
          </span>
          <span className="text-[10px] text-[#888] font-medium tracking-wide">
            In Stock
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
