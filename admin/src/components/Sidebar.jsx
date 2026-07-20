import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { LayoutDashboard, PlusSquare, Package, ShoppingBag } from "lucide-react";

const navItems = [
  { to: "/",       label: "Dashboard",  Icon: LayoutDashboard, end: true },
  { to: "/add",    label: "Add Items",  Icon: PlusSquare  },
  { to: "/list",   label: "Products",   Icon: Package     },
  { to: "/orders", label: "Orders",     Icon: ShoppingBag },
];

const Sidebar = () => {
  return (
    <aside
      className="w-14 sm:w-[220px] min-h-screen flex-shrink-0 flex flex-col"
      style={{ borderRight: '1px solid rgba(0,0,0,0.07)' }}
    >
      {/* Section label */}
      <div className="hidden sm:block px-5 pt-8 pb-3">
        <p
          className="text-[9px] tracking-[0.22em] font-bold uppercase"
          style={{ color: '#8C7355' }}
        >
          Navigation
        </p>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 px-2 sm:px-3 pt-6 sm:pt-2">
        {navItems.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center justify-center sm:justify-start gap-3 px-2 sm:px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'font-semibold'
                  : 'border border-transparent'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    backgroundColor: 'rgba(140,115,85,0.1)',
                    border: '1px solid rgba(140,115,85,0.25)',
                    color: '#8C7355',
                  }
                : { color: '#555' }
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  className="flex-shrink-0 transition-colors duration-200"
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span className="hidden sm:block text-sm tracking-wide">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom branding */}
      <div className="mt-auto hidden sm:flex items-center justify-center px-5 pb-8 pt-4">
        <img
          src={assets.logo}
          alt="Velora"
          className="w-24 opacity-60"
        />
      </div>
    </aside>
  );
};

export default Sidebar;