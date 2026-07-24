import { assets } from "assets/assets";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [badgeAnimated, setBadgeAnimated] = useState(false);
  
  const { setShowSearch, getCartCount, setSearch, token, setToken, setCartItems } =
    useContext(ShopContext);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = getCartCount();

  // Scroll handler for floating navbar morphing
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate cart badge when count updates
  useEffect(() => {
    if (cartCount > 0) {
      setBadgeAnimated(true);
      const timer = setTimeout(() => setBadgeAnimated(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock scroll on mobile menu toggle
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
    setProfileOpen(false);
  };

  const NAV_ITEMS = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ── Floating Capsule Header ── */}
      <header
        className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-500 ease-out ${
          scrolled
            ? "py-2 sm:py-2.5 bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.04)] rounded-full"
            : "py-3 sm:py-3.5 bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.07)] rounded-full"
        }`}
      >
        <div className="px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative overflow-hidden">
                <img
                  src={assets.logo}
                  className="w-26 sm:w-32 md:w-36 transition-transform duration-300 group-hover:scale-105"
                  alt="Velora"
                />
              </div>
              <span className="hidden lg:inline-block h-2 w-2 rounded-full bg-[#8C7355] animate-pulse" />
            </Link>

            {/* Desktop Navigation Links with animated active pill background */}
            <nav className="hidden sm:flex items-center gap-1 bg-black/[0.03] p-1.5 rounded-full border border-black/[0.04]">
              {NAV_ITEMS.map(({ to, label }) => {
                const isActive =
                  to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(to);

                return (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    className={`relative px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-[#555555] hover:text-[#121212] hover:bg-black/[0.04]"
                    }`}
                  >
                    {/* Active sliding background indicator */}
                    {isActive && (
                      <span className="absolute inset-0 bg-[#121212] rounded-full -z-10 shadow-sm transition-all duration-300" />
                    )}
                    {label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Action Buttons (Search, Profile, Cart, Mobile Menu) */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Toggle */}
              <button
                onClick={() => {
                  setShowSearch((prev) => !prev);
                  setSearch("");
                }}
                aria-label="Toggle search"
                className="group relative p-2.5 rounded-full hover:bg-black/[0.05] active:scale-95 transition-all duration-200"
              >
                <img
                  src={assets.search_icon}
                  className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                  alt="Search"
                />
              </button>

              {/* Account Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  aria-label="Account"
                  className={`group relative p-2.5 rounded-full transition-all duration-200 ${
                    profileOpen ? "bg-black/[0.08]" : "hover:bg-black/[0.05]"
                  } active:scale-95`}
                >
                  <img
                    src={assets.profile_icon}
                    className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                    alt="Account"
                  />
                  {token && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </button>

                {/* Account Menu Popup */}
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-black/5 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {token ? (
                      <>
                        <div className="px-3 py-2 border-b border-black/5 mb-1">
                          <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C7355]">Signed In</p>
                          <p className="text-xs font-medium text-[#121212] truncate">Welcome Back</p>
                        </div>
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#444] hover:text-[#121212] hover:bg-[#FAF9F6] rounded-xl transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-[#8C7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </button>
                        <button
                          onClick={() => {
                            navigate("/orders");
                            setProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#444] hover:text-[#121212] hover:bg-[#FAF9F6] rounded-xl transition-colors"
                        >
                          <svg className="w-3.5 h-3.5 text-[#8C7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          My Orders
                        </button>
                        <div className="h-px bg-black/5 my-1" />
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          navigate("/login");
                          setProfileOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#121212] hover:bg-[#2c2c2c] rounded-xl shadow-sm transition-all"
                      >
                        Sign In / Register
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Shopping Cart Link */}
              <Link
                to="/cart"
                aria-label="Cart"
                className="group relative p-2.5 rounded-full hover:bg-black/[0.05] active:scale-95 transition-all duration-200"
              >
                <img
                  src={assets.cart_icon}
                  className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                  alt="Cart"
                />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-4.5 px-1 flex items-center justify-center bg-[#8C7355] text-white text-[10px] font-bold rounded-full ring-2 ring-white transition-transform duration-300 ${
                      badgeAnimated ? "scale-125" : "scale-100"
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setVisible(true)}
                aria-label="Open menu"
                className="sm:hidden p-2.5 rounded-full hover:bg-black/[0.05] active:scale-95 transition-all duration-200"
              >
                <img
                  src={assets.menu_icon}
                  className="w-4 h-4 opacity-75"
                  alt="Menu"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Backdrop ── */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      />

      {/* ── Mobile Slide-in Drawer ── */}
      <aside
        className={`fixed top-0 right-0 h-full z-50 w-[78%] max-w-[340px] bg-white/95 backdrop-blur-2xl shadow-2xl transition-transform duration-400 ease-out border-l border-white/50 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header row */}
          <div className="flex items-center justify-between pb-6 border-b border-black/5">
            <img src={assets.logo} className="w-28" alt="Velora" />
            <button
              onClick={() => setVisible(false)}
              className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            >
              <svg className="w-4 h-4 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6 flex flex-col gap-2">
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs tracking-wider uppercase font-semibold transition-all ${
                    isActive
                      ? "bg-[#121212] text-white shadow-md"
                      : "text-[#555] hover:bg-black/5 hover:text-[#121212]"
                  }`
                }
              >
                {label}
                <span className="text-xs">→</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer info */}
          <div className="pt-6 border-t border-black/5 text-center">
            <p className="text-[11px] text-[#8C7355] font-medium tracking-widest uppercase">Velora Luxury</p>
            <p className="text-[10px] text-[#888] mt-1">Curated Fashion & Lifestyle</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
