import { assets } from "assets/assets";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, setShowSearch, showSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (showSearch) {
      setMounted(true);
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
      setTimeout(() => inputRef.current?.focus(), 100);
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [showSearch]);

  useEffect(() => {
    if (showSearch && search && !location.pathname.includes("collection")) {
      navigate("/collection");
    }
  }, [search]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setSearch("");
      }
    };
    if (showSearch) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showSearch]);

  if (!mounted) return null;

  return (
    <>
      {/* Search Bar Overlay Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
      />

      {/* Floating Glass Capsule Search Bar */}
      <div
        className={`fixed top-18 sm:top-22 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl bg-white/95 backdrop-blur-xl border border-white/80 shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 ease-out transform ${
          visible
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-4 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 w-full">
          {/* Search Icon */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4 h-4 text-[#8C7355] opacity-70 flex-shrink-0"
          />

          {/* Input field */}
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="flex-1 min-w-0 bg-transparent outline-none text-xs sm:text-sm text-[#121212] placeholder-[#888] font-medium tracking-wide"
            placeholder="Search products by name, category, or style..."
          />

          {/* Clear button */}
          {search && (
            <button
              onClick={() => {
                setSearch("");
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full bg-black/5 hover:bg-black/10 text-xs text-[#666] transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Close button */}
          <button
            onClick={() => {
              setShowSearch(false);
              setSearch("");
            }}
            className="px-3 py-1.5 rounded-full bg-[#121212] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#8C7355] transition-colors flex-shrink-0"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
