import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products
        .filter((item) => item.category === category && item.subCategory === subCategory)
        .slice(0, 5);
      setRelated(filtered);
    }
  }, [products, category, subCategory]);

  useEffect(() => {
    if (!related.length) return;
    const raf = requestAnimationFrame(() => {
      if (!sectionRef.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setVisible(true); },
        { threshold: 0.05 }
      );
      observer.observe(sectionRef.current);
    
      return () => observer.disconnect();
    });
    return () => cancelAnimationFrame(raf);
  }, [related.length]);

  if (!related.length) return null;

  return (
    <section ref={sectionRef} className="pt-16 pb-4">
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#8C7355]/20 to-transparent mb-12" />

      {/* Header */}
      <div
        className="text-center mb-8 transition-all duration-600"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <Title text1="YOU MAY ALSO LIKE" text2="Related Styles" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {related.map((item, index) => (
          <div
            key={item._id}
            className="transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transitionDelay: visible ? `${index * 60}ms` : "0ms",
            }}
          >
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
