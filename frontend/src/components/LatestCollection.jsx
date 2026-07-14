import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  // Intersection observer for fade-in-up on scroll
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
      {/* Header */}
      <div
        className="text-center mb-10 sm:mb-12 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <Title text1="NEW IN" text2="Latest Collections" />
        <p className="mt-4 mx-auto max-w-[480px] text-[12px] sm:text-[13px] text-[#888] leading-relaxed px-4">
          Fresh styles added every week — handpicked to keep your wardrobe ahead of the curve.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        {latestProducts.map((item, index) => (
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
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
