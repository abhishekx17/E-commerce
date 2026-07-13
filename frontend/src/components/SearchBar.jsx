import { assets } from "assets/assets";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, setShowSearch, showSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (showSearch) {
      requestAnimationFrame(() => setMounted(true));
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setMounted(false);
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

  if (!showSearch) return null;

  return (
    <div
      className={`border-b border-gray-200 bg-white transition-all duration-300 ease-in-out overflow-hidden ${
        mounted ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="flex items-center justify-center gap-2 py-3 px-3 sm:px-4 sm:py-4">
        {/* Search bar box */}
        <div className="flex items-center w-full max-w-xl border border-gray-300 rounded-full px-4 py-2 gap-2 focus-within:border-gray-600 transition-colors duration-200 bg-white">
          <img src={assets.search_icon} alt="" className="w-4 opacity-50 flex-shrink-0" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="flex-1 min-w-0 outline-none text-sm text-gray-800 placeholder-gray-400 bg-white"
            placeholder="Search products..."
          />
          {search && (
            <button
              onClick={() => { setSearch(""); inputRef.current?.focus(); }}
              className="text-gray-400 hover:text-gray-700 transition-colors text-sm flex-shrink-0"
            >
              ✕
            </button>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => { setShowSearch(false); setSearch(""); }}
          className="text-gray-500 hover:text-black transition-colors text-xs sm:text-sm flex-shrink-0 whitespace-nowrap"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
