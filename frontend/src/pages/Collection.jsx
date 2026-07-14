import { assets } from "assets/assets";
import ProductItem from "components/ProductItem";
import Title from "components/Title";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useState } from "react";

/* ── Checkbox filter row ─────────────────────────────────── */
const FilterCheck = ({ label, value, checked, onChange }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group py-1">
    <span
      className={`w-4 h-4 flex-shrink-0 rounded border transition-all duration-150 flex items-center justify-center ${
        checked
          ? "bg-[#8C7355] border-[#8C7355]"
          : "border-black/20 group-hover:border-[#8C7355]"
      }`}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
          <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    <span className={`text-[12px] tracking-wide transition-colors duration-150 ${checked ? "text-[#1A1A1A] font-medium" : "text-[#666] group-hover:text-[#1A1A1A]"}`}>
      {label}
    </span>
  </label>
);

/* ── Main component ──────────────────────────────────────── */
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const applyFilter = () => {
    let copy = products.slice();
    if (showSearch && search)
      copy = copy.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    if (category.length > 0)
      copy = copy.filter((i) => category.includes(i.category));
    if (subCategory.length > 0)
      copy = copy.filter((i) => subCategory.includes(i.subCategory));
    setFilterProducts(copy);
  };

  const sortProduct = () => {
    let copy = filterProducts.slice();
    if (sortType === "low-high") setFilterProducts(copy.sort((a, b) => a.price - b.price));
    else if (sortType === "high-low") setFilterProducts(copy.sort((a, b) => b.price - a.price));
    else applyFilter();
  };

  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch, products]);
  useEffect(() => { sortProduct(); }, [sortType]);

  const activeFilterCount = category.length + subCategory.length;

  return (
    <div className="pt-8 pb-16">
      {/* ── Page header ── */}
      <div className="text-center mb-10">
        <Title text1="BROWSE" text2="All Collection" />
        <p className="mt-3 text-[12px] sm:text-[13px] text-[#888] tracking-wide">
          {filterProducts.length} {filterProducts.length === 1 ? "piece" : "pieces"} found
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        {/* ════════════════ FILTER SIDEBAR ════════════════ */}
        <aside className="w-full sm:w-52 flex-shrink-0">

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilter((p) => !p)}
            className="sm:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-black/10 mb-4 shadow-sm"
          >
            <span className="text-[11px] tracking-[0.18em] font-medium text-[#1A1A1A] uppercase">
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-4 h-4 bg-[#8C7355] text-white text-[9px] rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <img
              src={assets.dropdown_icon}
              alt=""
              className={`h-2.5 transition-transform duration-300 ${showFilter ? "rotate-180" : ""}`}
            />
          </button>

          {/* Filter panels */}
          <div
            className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${
              showFilter ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 sm:max-h-[600px] sm:opacity-100"
            }`}
          >
            {/* Categories */}
            <div className="rounded-xl border border-black/8 bg-white p-4 shadow-sm">
              <p className="text-[10px] tracking-[0.2em] font-semibold text-[#8C7355] uppercase mb-3">
                Category
              </p>
              <div className="flex flex-col gap-0.5">
                {["Men", "Women", "Kids"].map((cat) => (
                  <FilterCheck
                    key={cat}
                    label={cat}
                    value={cat}
                    checked={category.includes(cat)}
                    onChange={toggleCategory}
                  />
                ))}
              </div>
            </div>

            {/* Types */}
            <div className="rounded-xl border border-black/8 bg-white p-4 shadow-sm">
              <p className="text-[10px] tracking-[0.2em] font-semibold text-[#8C7355] uppercase mb-3">
                Type
              </p>
              <div className="flex flex-col gap-0.5">
                {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                  <FilterCheck
                    key={type}
                    label={type}
                    value={type}
                    checked={subCategory.includes(type)}
                    onChange={toggleSubCategory}
                  />
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setCategory([]); setSubCategory([]); }}
                className="text-[11px] tracking-wide text-[#8C7355] hover:text-[#5a4835] transition-colors duration-150 flex items-center gap-1.5 px-1"
              >
                <span className="text-base leading-none">×</span> Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* ════════════════ PRODUCT GRID ════════════════ */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <p className="hidden sm:block text-[11px] tracking-[0.15em] text-[#888] uppercase">
              {filterProducts.length} Results
            </p>

            {/* Sort dropdown */}
            <div className="relative ml-auto">
              <select
                onChange={(e) => setSortType(e.target.value)}
                value={sortType}
                className="appearance-none pl-3 pr-8 py-2 text-[11px] tracking-wide rounded-xl border border-black/10 bg-white text-[#1A1A1A] shadow-sm focus:outline-none focus:border-[#8C7355] transition-colors duration-200 cursor-pointer"
              >
                <option value="relevent">Relevance</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
              </select>
              <img
                src={assets.dropdown_icon}
                alt=""
                className="absolute right-2.5 top-1/2 -translate-y-1/2 h-2 pointer-events-none opacity-50"
              />
            </div>
          </div>

          {/* Grid */}
          {filterProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-[#DADADA] mb-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <p className="text-[14px] font-medium text-[#1A1A1A]">No products found</p>
              <p className="text-[12px] text-[#888] mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {filterProducts.map((item, index) => (
                <div
                  key={item._id}
                  style={{
                    animation: `fadeSlideUp 0.4s ease both`,
                    animationDelay: `${Math.min(index * 30, 300)}ms`,
                  }}
                >
                  <ProductItem
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Collection;
