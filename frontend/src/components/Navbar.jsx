import { assets } from "assets/assets";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { setShowSearch, getCartCount, setSearch, token, setToken, setCartItems } =
    useContext(ShopContext);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu open
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

  const navLinkClass = ({ isActive }) =>
    `relative text-[11px] sm:text-xs tracking-[0.18em] font-medium uppercase transition-colors duration-200 pb-0.5 group ${
      isActive ? "text-[#1A1A1A]" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
    }`;

  return (
    <>
      {/* ── Sticky header shell ── */}
      <header
        className={`sticky top-0 z-40 bg-[#FAF9F7]/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_16px_rgba(0,0,0,0.07)]" : "shadow-none"
        }`}
      >
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <div className="flex items-center justify-between h-[62px] sm:h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={assets.logo}
                className="w-28 sm:w-36 md:w-40 transition-opacity duration-200 hover:opacity-75"
                alt="Velora"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-8">
              {[
                { to: "/", label: "Home" },
                { to: "/collection", label: "Collection" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={navLinkClass}
                  end={to === "/"}
                >
                  {label}
                  {/* animated underline */}
                  <span className="absolute bottom-0 left-0 h-[1.5px] bg-[#8C7355] w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Search */}
              <button
                onClick={() => {
                  setShowSearch((prev) => !prev);
                  setSearch("");
                }}
                aria-label="Toggle search"
                className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 transition-colors duration-200"
              >
                <img
                  src={assets.search_icon}
                  className="w-[17px] opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  alt="Search"
                />
              </button>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  aria-label="Account"
                  className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 transition-colors duration-200"
                >
                  <img
                    src={assets.profile_icon}
                    className="w-[17px] opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                    alt="Account"
                  />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div
                    className={`absolute right-0 top-[calc(100%+10px)] w-44 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/5 overflow-hidden transition-all duration-200 origin-top-right ${
                      profileOpen
                        ? "scale-100 opacity-100 pointer-events-auto"
                        : "scale-95 opacity-0 pointer-events-none"
                    }`}
                  >
                    {token ? (
                      [
                        {
                          label: "My Profile",
                          action: () => {
                            navigate("/profile");
                            setProfileOpen(false);
                          },
                        },
                        {
                          label: "Orders",
                          action: () => {
                            navigate("/orders");
                            setProfileOpen(false);
                          },
                        },
                        { label: "Logout", action: logout },
                      ].map(({ label, action }) => (
                        <button
                          key={label}
                          onClick={action}
                          className="w-full text-left px-4 py-3 text-[12px] tracking-wide text-[#555] hover:text-[#1A1A1A] hover:bg-[#FAF9F7] transition-colors duration-150 border-b border-black/5 last:border-0"
                        >
                          {label}
                        </button>
                      ))
                    ) : (
                      <button
                        onClick={() => {
                          navigate("/login");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-[12px] tracking-wide text-[#555] hover:text-[#1A1A1A] hover:bg-[#FAF9F7] transition-colors duration-150"
                      >
                        Login
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label="Cart"
                className="group relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 transition-colors duration-200"
              >
                <img
                  src={assets.cart_icon}
                  className="w-[17px] opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  alt="Cart"
                />
                {getCartCount() > 0 && (
                  <span className="absolute -right-0.5 -bottom-0.5 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-[#1A1A1A] text-white text-[9px] font-medium rounded-full leading-none">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setVisible(true)}
                aria-label="Open menu"
                className="sm:hidden group flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 transition-colors duration-200"
              >
                <img
                  src={assets.menu_icon}
                  className="w-[17px] opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  alt="Menu"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Thin accent rule at bottom ── */}
        <div
          className={`h-px bg-gradient-to-r from-transparent via-black/8 to-transparent transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
        />
      </header>

      {/* ── Mobile backdrop ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      />

      {/* ── Mobile slide-in drawer ── */}
      <div
        className={`fixed top-0 right-0 h-full z-50 w-[70%] max-w-[300px] bg-[#FAF9F7] shadow-2xl transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close row */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 px-5 py-5 cursor-pointer border-b border-black/8"
          >
            <img
              src={assets.dropdown_icon}
              className="h-3 rotate-180 opacity-50"
              alt=""
            />
            <span className="text-[10px] tracking-[0.2em] text-[#888] font-medium uppercase">
              Close
            </span>
          </div>

          <nav className="flex-1 pt-2">
            {[
              { to: "/", label: "Home" },
              { to: "/collection", label: "Collection" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `block px-6 py-4 text-[11px] tracking-[0.2em] font-medium uppercase border-b border-black/5 transition-colors duration-150 ${
                    isActive
                      ? "text-[#1A1A1A] bg-black/3"
                      : "text-[#555] hover:text-[#1A1A1A] hover:bg-black/3"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Bottom brand mark */}
          <div className="px-6 pb-8 pt-4">
            <img src={assets.logo} className="w-24 opacity-30" alt="Velora" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
