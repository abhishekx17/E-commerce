import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20">
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#8C7355]/20 to-transparent mb-16" />

      {/* Header */}
      <div
        className="text-center mb-10 sm:mb-12 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <Title text1="CUSTOMER FAVORITES" text2="Best Sellers" />
        <p className="mt-4 mx-auto max-w-[480px] text-[12px] sm:text-[13px] text-[#888] leading-relaxed px-4">
          Our most loved pieces — top rated, consistently loved, and worth every penny.
        </p>
      </div>

      {/* Grid — centered when fewer than 5 items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        {bestSeller.map((item, index) => (
          <div
            key={item._id}
            className="transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: visible ? `${index * 60}ms` : "0ms",
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
    </section>
  );
};

export default BestSeller;
