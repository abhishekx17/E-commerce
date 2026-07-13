import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-12 sm:w-[18%] min-h-screen border-r border-gray-200 bg-white flex-shrink-0">
      <div className="flex flex-col gap-1 sm:gap-2 pt-6 sm:pt-8 px-1 sm:px-4 text-[15px]">
        <NavLink
          className={({ isActive }) =>
            `flex items-center justify-center sm:justify-start gap-3 px-2 sm:px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-orange-50 border border-orange-200 text-orange-600 font-medium"
                : "border border-transparent text-gray-600 hover:bg-gray-50"
            }`
          }
          to="/add"
        >
          <img className="w-5 h-5 flex-shrink-0" src={assets.add_icon} alt="Add Items" />
          <p className="hidden sm:block">Add Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center justify-center sm:justify-start gap-3 px-2 sm:px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-orange-50 border border-orange-200 text-orange-600 font-medium"
                : "border border-transparent text-gray-600 hover:bg-gray-50"
            }`
          }
          to="/list"
        >
          <img className="w-5 h-5 flex-shrink-0" src={assets.order_icon} alt="List Items" />
          <p className="hidden sm:block">List Items</p>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `flex items-center justify-center sm:justify-start gap-3 px-2 sm:px-4 py-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-orange-50 border border-orange-200 text-orange-600 font-medium"
                : "border border-transparent text-gray-600 hover:bg-gray-50"
            }`
          }
          to="/orders"
        >
          <img className="w-5 h-5 flex-shrink-0" src={assets.order_icon} alt="Orders" />
          <p className="hidden sm:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;