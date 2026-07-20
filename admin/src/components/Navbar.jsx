import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow duration-300 ${
        scrolled
          ? 'shadow-[0_1px_16px_rgba(0,0,0,0.07)]'
          : 'shadow-none'
      }`}
      style={{ backgroundColor: 'rgba(250,249,247,0.95)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center justify-between h-[62px] sm:h-[70px] px-4 sm:px-8 lg:px-10">
        {/* Logo + badge */}
        <div className="flex items-center gap-3">
          <img
            src={assets.logo}
            alt="Velora"
            className="h-7 sm:h-10 w-auto object-contain"
          />
          <span
            className="hidden sm:inline-block text-[9px] tracking-[0.22em] font-semibold uppercase px-2 py-0.5 rounded-full border"
            style={{ color: '#8C7355', borderColor: 'rgba(140,115,85,0.3)', backgroundColor: 'rgba(140,115,85,0.07)' }}
          >
            Admin
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setToken('')}
            className="text-xs sm:text-sm font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border transition-all duration-200"
            style={{
              color: '#8C7355',
              borderColor: 'rgba(140,115,85,0.4)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#8C7355';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = '#8C7355';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#8C7355';
              e.currentTarget.style.borderColor = 'rgba(140,115,85,0.4)';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Thin gradient rule */}
      <div
        className={`h-px transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent)' }}
      />
      {/* Static separator */}
      <div className="h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
    </header>
  );
};

export default Navbar;