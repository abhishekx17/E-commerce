import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";

const CATEGORIES = ["All", "Women", "Men", "Topwear", "Bottomwear"];

const LatestCollection = () => {
  const { products, loading } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    let filtered = products;
    if (activeCategory !== "All") {
      filtered = products.filter(
        (item) =>
          item.category?.toLowerCase() === activeCategory.toLowerCase() ||
          item.subCategory?.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    setLatestProducts(filtered.slice(0, 10));
  }, [products, activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16">
      
      {/* ── Section Header ── */}
      <div
        className="text-center mb-10 transition-all duration-700 transform"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C7355]/10 border border-[#8C7355]/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355] animate-ping" />
          <span className="text-[10px] font-bold tracking-widest text-[#8C7355] uppercase">
            Fresh Arrivals
          </span>
        </div>

        <Title text1="LATEST" text2="Collections" />

        <p className="mt-3 mx-auto max-w-[520px] text-xs sm:text-sm text-[#666] leading-relaxed px-4">
          Handpicked luxury pieces updated weekly to refresh your seasonal wardrobe with timeless craftsmanship.
        </p>

        {/* Category Pill Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 px-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#121212] text-white shadow-md scale-105"
                    : "bg-white border border-black/10 text-[#555] hover:border-black/30 hover:text-[#121212]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Product Grid or Skeleton Loading ── */}
      {loading ? (
        <ProductSkeleton count={10} />
      ) : latestProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {latestProducts.map((item, index) => (
            <div
              key={item._id}
              className="transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: visible ? `${index * 40}ms` : "0ms",
              }}
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-[#888]">
          No products available in this category currently.
        </div>
      )}
    </section>
  );
};

export default LatestCollection;
