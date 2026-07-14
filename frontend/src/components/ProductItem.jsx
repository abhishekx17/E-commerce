import { ShopContext } from "context/ShopContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => scrollTo(0, 0)}
      className="group flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-lg bg-[#F2F0EC] aspect-[3/4]">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-107"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/6 transition-colors duration-300 rounded-lg" />
      </div>

      {/* Info */}
      <div className="mt-2.5 px-0.5">
        <p className="text-[12px] sm:text-[13px] text-[#1A1A1A] leading-snug line-clamp-2 font-medium tracking-wide">
          {name}
        </p>
        <p className="mt-1 text-[12px] sm:text-[13px] text-[#8C7355] font-semibold tracking-wide">
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
