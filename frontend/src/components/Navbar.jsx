import { assets } from "assets/assets";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-4 sm:py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-32 sm:w-44 md:w-50" alt="Velora" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
      </ul>

      <div className="flex items-center gap-3 sm:gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className=" group relative">
          <Link to={"/login"}>
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
          </Link>
          <div className=" group-hover:block hidden absolute dropdown-menu right-0 pt-4 ">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className=" absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className=" w-5 cursor-pointer sm:hidden "
          alt=""
        />
      </div>

      {/* Backdrop overlay */}
      {visible && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={() => setVisible(false)}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={`fixed top-0 right-0 h-full z-50 overflow-hidden bg-white/80 backdrop-blur-md shadow-2xl border-l border-white/40 transition-all duration-300 ease-in-out ${visible ? `w-[65%] max-w-[280px]` : `w-0`}`}
      >
        <div className="flex flex-col text-gray-700 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 p-4 cursor-pointer border-b border-gray-200/60"
          >
            <img src={assets.dropdown_icon} className="h-3.5 rotate-180 opacity-70" alt="" />
            <p className="font-medium text-xs tracking-widest text-gray-500">CLOSE</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3.5 pl-6 border-b border-gray-100/80 block text-sm font-medium tracking-widest hover:bg-white/60 transition-colors"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3.5 pl-6 border-b border-gray-100/80 block text-sm font-medium tracking-widest hover:bg-white/60 transition-colors"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3.5 pl-6 border-b border-gray-100/80 block text-sm font-medium tracking-widest hover:bg-white/60 transition-colors"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3.5 pl-6 border-b border-gray-100/80 block text-sm font-medium tracking-widest hover:bg-white/60 transition-colors"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
