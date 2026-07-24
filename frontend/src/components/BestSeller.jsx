import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import ProductSkeleton from "./ProductSkeleton";

const BestSeller = () => {
  const { products, loading } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    const items = bestProduct.length > 0 ? bestProduct : products.slice(0, 5);
    setBestSeller(items.slice(0, 5));
  }, [products]);

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
      {/* ── Ambient Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#8C7355]/30 to-transparent mb-16" />

      {/* ── Header ── */}
      <div
        className="text-center mb-10 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-3">
          <span className="text-[10px] font-bold tracking-widest text-amber-700 uppercase">
            🔥 Customer Favorites
          </span>
        </div>

        <Title text1="BEST" text2="Sellers" />

        <p className="mt-3 mx-auto max-w-[500px] text-xs sm:text-sm text-[#666] leading-relaxed px-4">
          Our most coveted pieces — highly rated, consistently loved, and crafted to perfection.
        </p>
      </div>

      {/* ── Skeleton Loading or Grid Showcase ── */}
      {loading || bestSeller.length === 0 ? (
        <ProductSkeleton count={5} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {bestSeller.map((item, index) => (
            <div
              key={item._id}
              className="transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: visible ? `${index * 50}ms` : "0ms",
              }}
            >
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BestSeller;
