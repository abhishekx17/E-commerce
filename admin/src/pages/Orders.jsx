import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { RefreshCw, ShoppingBag, ChevronDown } from "lucide-react";

const STATUS_OPTIONS = [
  "Order placed",
  "Packing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

const STATUS_CONFIG = {
  "Order placed":     { dot: "bg-blue-500",    badge: "text-blue-700 bg-blue-50 border-blue-200" },
  "Packing":          { dot: "bg-amber-500",   badge: "text-amber-700 bg-amber-50 border-amber-200" },
  "Shipped":          { dot: "bg-violet-500",  badge: "text-violet-700 bg-violet-50 border-violet-200" },
  "Out for delivery": { dot: "bg-orange-500",  badge: "text-orange-700 bg-orange-50 border-orange-200" },
  "Delivered":        { dot: "bg-emerald-500", badge: "text-emerald-700 bg-emerald-50 border-emerald-200" },
};

const formatDate = (ts) => {
  if (!ts) return "—";
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const InfoRow = ({ label, value, valueClass = "text-gray-700" }) => (
  <div className="flex items-baseline gap-1">
    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0 w-14">
      {label}
    </span>
    <span className={`text-xs font-semibold ${valueClass}`}>: {value}</span>
  </div>
);

const Orders = ({ token }) => {
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAllOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (data.success) {
        setOrders([...data.orders].reverse());
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Status updated");
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status } : o))
        );
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg font-semibold text-gray-800">Orders</h2>
          {!loading && (
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {orders.length}
            </span>
          )}
        </div>
        <button
          onClick={fetchAllOrders}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-pink-600 border border-gray-200 hover:border-pink-300 rounded-lg px-3 py-1.5 transition-all disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse">
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-gray-100 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2.5">
                  <div className="h-3 bg-gray-100 rounded w-3/5" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-2/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 border border-dashed border-gray-200 rounded-2xl bg-white">
          <ShoppingBag size={42} strokeWidth={1.2} className="text-gray-300" />
          <p className="text-sm font-medium text-gray-500">No orders yet</p>
          <p className="text-xs text-gray-400">Orders will appear here once customers place them</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order) => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG["Order placed"];
            const customerName = `${order.address.firstname || ""} ${order.address.lastname || ""}`.trim();
            const addressLine = [
              order.address.city,
              order.address.state,
              order.address.country,
              order.address.zipcode,
            ].filter(Boolean).join(", ");

            return (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-2xl hover:border-pink-200 hover:shadow-md transition-all duration-200 group"
              >
               
                <div className="grid grid-cols-1 sm:grid-cols-[44px_1fr_140px_170px] lg:grid-cols-[44px_1fr_140px_80px_170px] gap-4 items-start p-4">

                  <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl bg-pink-50 border border-pink-100 shrink-0 mt-0.5 group-hover:bg-pink-100 transition-colors">
                    <img src={assets.parcel_icon} alt="parcel" className="w-5 h-5 opacity-70" />
                  </div>

                  <div className="min-w-0">

                    <div className="flex items-center gap-2 sm:hidden mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-50 border border-pink-100 shrink-0">
                        <img src={assets.parcel_icon} alt="parcel" className="w-4 h-4 opacity-70" />
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(order.date)}</span>
                    </div>

                    <div className="space-y-0.5 mb-2">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-sm text-gray-800 font-medium leading-snug">
                          {item.name}
                          <span className="text-gray-600"> × {item.quantity}</span>
                          {" "}
                          <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md font-normal">
                            {item.size}
                          </span>
                          {i < order.items.length - 1 && (
                            <span className="text-gray-300">, </span>
                          )}
                        </p>
                      ))}
                    </div>

                    <p className="text-sm font-bold text-gray-800 mt-2 mb-0.5">
                      {customerName || "—"}
                    </p>

                    {order.address.street && (
                      <p className="text-xs text-gray-500">{order.address.street},</p>
                    )}
                    <p className="text-xs text-gray-500">{addressLine}</p>

                    {order.address.phone && (
                      <p className="text-xs text-gray-400 mt-0.5">{order.address.phone}</p>
                    )}

                    <div className="sm:hidden mt-3 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                          {order.paymentMethod}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${order.payment ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-red-600 bg-red-50 border-red-200"}`}>
                          {order.payment ? "Paid" : "Pending"}
                        </span>
                        <span className="text-[10px] font-bold text-gray-800 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                          {currency}{order.amount}
                        </span>
                      </div>
                      <div className="relative">
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="w-full appearance-none text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl pl-3 pr-7 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all disabled:opacity-50 shadow-sm"
                        >
                          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col gap-1.5 pt-0.5">
                    <InfoRow label="Items"   value={order.items.length} />
                    <InfoRow label="Method"  value={order.paymentMethod} />
                    <InfoRow
                      label="Payment"
                      value={order.payment ? "Done" : "Pending"}
                      valueClass={order.payment ? "text-emerald-600" : "text-red-500"}
                    />
                    <InfoRow label="Date" value={formatDate(order.date)} valueClass="text-gray-500" />
                  </div>

                  <div className="hidden lg:flex items-start pt-0.5">
                    <p className="text-base font-extrabold text-gray-800">
                      {currency}{order.amount}
                    </p>
                  </div>

                  <div className="hidden sm:flex flex-col gap-2 pt-0.5">
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border w-fit ${cfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} shrink-0`} />
                      {order.status}
                    </div>
                    <div className="relative">
                      <select
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="w-full appearance-none text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl pl-3 pr-7 py-2 cursor-pointer hover:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-400 transition-all disabled:opacity-50 shadow-sm"
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    {updatingId === order._id && (
                      <p className="text-[10px] text-pink-400 animate-pulse font-medium">Saving…</p>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
