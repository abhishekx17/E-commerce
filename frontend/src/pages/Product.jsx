import { assets } from "assets/assets";
import RelatedProducts from "components/RelatedProducts";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
      }
    });
  }, [productId, products]);

  // Fade-in on mount
  useEffect(() => {
    if (productData) {
      requestAnimationFrame(() => requestAnimationFrame(() => setLoaded(true)));
    }
  }, [productData]);

  const handleAddToCart = () => {
    addToCart(productData._id, size);
    if (size) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-6 h-6 rounded-full border-2 border-[#8C7355] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="pt-8 pb-20 transition-all duration-500"
      style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)" }}
    >
      {/* ══════════════ PRODUCT MAIN ══════════════ */}
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16">

        {/* ── Images ── */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:w-[80px] pb-1 sm:pb-0">
            {productData.image.map((img, i) => (
              <button
                key={i}
                onClick={() => setImage(img)}
                className={`flex-shrink-0 w-[68px] sm:w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  img === image
                    ? "border-[#8C7355] opacity-100"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[#F2F0EC]">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>

        {/* ── Info panel ── */}
        <div className="flex-1 flex flex-col">

          {/* Category badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] tracking-[0.2em] text-[#8C7355] font-medium uppercase">
              {productData.category} · {productData.subCategory}
            </span>
          </div>

          {/* Name */}
          <h1 className="font-['Playfair_Display',Georgia,serif] text-2xl sm:text-3xl font-medium text-[#1A1A1A] leading-snug tracking-tight">
            {productData.name}
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-1.5 mt-3">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <span className="ml-1.5 text-[12px] text-[#888]">4.0 (122 reviews)</span>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-semibold text-[#1A1A1A] tracking-tight">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="mt-4 text-[13px] text-[#666] leading-relaxed max-w-sm">
            {productData.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-black/8 my-6" />

          {/* Size selector */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] tracking-[0.18em] font-semibold text-[#1A1A1A] uppercase">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[44px] h-10 px-3 rounded-lg text-[12px] font-medium tracking-wide border-2 transition-all duration-150 ${
                    s === size
                      ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                      : "border-black/12 bg-white text-[#555] hover:border-[#8C7355] hover:text-[#8C7355]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-6 w-full sm:max-w-xs flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-[12px] tracking-[0.18em] font-semibold uppercase transition-all duration-300 ${
              added
                ? "bg-[#8C7355] text-white"
                : "bg-[#1A1A1A] text-white hover:bg-[#333]"
            }`}
          >
            {added ? (
              <>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M2.5 8L6.5 12L13.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Added to Cart
              </>
            ) : "Add to Cart"}
          </button>

          {/* Trust signals */}
          <div className="mt-6 flex flex-col gap-2">
            {[
              "100% Original Product — authenticity guaranteed",
              "Cash on delivery available",
              "Easy returns & exchanges within 7 days",
            ].map((text) => (
              <div key={text} className="flex items-start gap-2 text-[11px] text-[#888]">
                <span className="text-[#8C7355] font-bold mt-px">✓</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ TABS ══════════════ */}
      <div className="mt-16 sm:mt-20">
        {/* Tab headers */}
        <div className="flex border-b border-black/10">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-3 text-[11px] tracking-[0.15em] font-medium uppercase transition-colors duration-200 ${
                activeTab === tab ? "text-[#1A1A1A]" : "text-[#888] hover:text-[#1A1A1A]"
              }`}
            >
              {tab === "reviews" ? "Reviews (122)" : "Description"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C7355] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="py-6 px-1 text-[13px] text-[#666] leading-relaxed max-w-2xl">
          {activeTab === "description" ? (
            <div className="flex flex-col gap-4">
              <p>
                An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.
              </p>
              <p>
                E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {[
                { name: "Sarah M.", rating: 5, text: "Absolutely love this! Great quality and fits perfectly. Would highly recommend." },
                { name: "James K.", rating: 4, text: "Really good product, exactly as described. Fast delivery too." },
              ].map((review) => (
                <div key={review.name} className="bg-white rounded-xl border border-black/8 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-[#8C7355]/20 flex items-center justify-center text-[11px] font-semibold text-[#8C7355]">
                      {review.name[0]}
                    </div>
                    <span className="text-[12px] font-medium text-[#1A1A1A]">{review.name}</span>
                    <div className="flex ml-auto">
                      {[...Array(review.rating)].map((_, i) => (
                        <img key={i} src={assets.star_icon} alt="" className="w-3" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[12px] text-[#666]">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══════════════ RELATED ══════════════ */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;