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
      setTimeout(() => inputRef.current?.focus(), 80);
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
      if (e.key === "Escape") { setShowSearch(false); setSearch(""); }
    };
    if (showSearch) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showSearch]);

  if (!mounted) return null;

  return (
    <div
      className="sticky top-[62px] sm:top-[70px] z-30 overflow-hidden"
      style={{
        transition: "max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease",
        maxHeight: visible ? "72px" : "0px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-6px)",
      }}
    >
      <div className="bg-[#FAF9F7]/96 backdrop-blur-md border-b border-black/8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
        {/* Constrained to same padding as Navbar */}
        {/* Pill + Cancel grouped together and centred as a unit */}
        <div className="py-2.5 flex justify-center px-3 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <div className="flex items-center gap-2">

            {/* Search pill */}
            <div
              className="flex items-center w-[200px] xs:w-[240px] sm:w-[300px] md:w-[340px] gap-2 px-3 sm:px-4 py-2 rounded-full bg-white border transition-colors duration-200"
              style={{ borderColor: search ? "#8C7355" : "rgba(0,0,0,0.12)" }}
            >
              <img
                src={assets.search_icon}
                alt=""
                className="w-[13px] sm:w-[15px] flex-shrink-0"
                style={{ opacity: search ? 0.9 : 0.45 }}
              />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="flex-1 min-w-0 w-0 outline-none text-[12px] sm:text-[13px] text-[#1A1A1A] placeholder-[#ABABAB] bg-transparent tracking-wide"
                placeholder="Search…"
              />
              {search && (
                <button
                  onClick={() => { setSearch(""); inputRef.current?.focus(); }}
                  className="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded-full bg-[#DADADA] hover:bg-[#8C7355] transition-colors duration-200 text-white text-[9px] leading-none"
                  aria-label="Clear"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Cancel — sits immediately right of the pill */}
            <button
              onClick={() => { setShowSearch(false); setSearch(""); }}
              className="flex-shrink-0 text-[10px] sm:text-[11px] tracking-[0.12em] uppercase font-medium text-[#888] hover:text-[#1A1A1A] px-2 sm:px-3 py-2 rounded-full hover:bg-black/5 transition-all duration-200 whitespace-nowrap"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
