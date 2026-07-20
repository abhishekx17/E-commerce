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

const InfoRow = ({ label, value, valueClass = "text-[#555]" }) => (
  <div className="flex items-baseline gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest shrink-0 w-16" style={{ color: '#aaa' }}>
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
      {/* Page heading */}
      <div className="mb-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-[#1A1A1A] prata-regular">
              Orders
            </h1>
            {!loading && (
              <span
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(140,115,85,0.1)',
                  color: '#8C7355',
                  border: '1px solid rgba(140,115,85,0.2)',
                }}
              >
                {orders.length}
              </span>
            )}
          </div>

          {/* Refresh button */}
          <button
            onClick={fetchAllOrders}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 disabled:opacity-50"
            style={{
              border: '1px solid rgba(140,115,85,0.25)',
              color: '#8C7355',
              backgroundColor: 'rgba(140,115,85,0.04)',
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'rgba(140,115,85,0.1)';
                e.currentTarget.style.borderColor = 'rgba(140,115,85,0.4)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'rgba(140,115,85,0.04)';
              e.currentTarget.style.borderColor = 'rgba(140,115,85,0.25)';
            }}
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
        <div className="mt-2 h-px w-16" style={{ backgroundColor: '#8C7355' }} />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl p-5 animate-pulse"
              style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl flex-shrink-0" style={{ backgroundColor: 'rgba(140,115,85,0.08)' }} />
                <div className="flex-1 space-y-3">
                  <div className="h-3 rounded-lg w-3/5" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />
                  <div className="h-3 rounded-lg w-1/3" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />
                  <div className="h-3 rounded-lg w-2/5" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && orders.length === 0 && (
        <div
          className="flex flex-col items-center justify-center gap-3 py-24 rounded-2xl"
          style={{
            border: '2px dashed rgba(140,115,85,0.2)',
            backgroundColor: 'rgba(140,115,85,0.02)',
          }}
        >
          <ShoppingBag size={44} strokeWidth={1.2} style={{ color: 'rgba(140,115,85,0.35)' }} />
          <p className="text-sm font-medium" style={{ color: '#aaa' }}>No orders yet</p>
          <p className="text-xs" style={{ color: '#ccc' }}>Orders will appear here once customers place them</p>
        </div>
      )}

      {/* Order cards */}
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
                className="rounded-2xl transition-all duration-200 group"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.03)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(140,115,85,0.3)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(140,115,85,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)';
                  e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,0,0,0.03)';
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-[48px_1fr_140px_170px] lg:grid-cols-[48px_1fr_140px_80px_170px] gap-4 items-start p-5">

                  {/* Parcel icon — desktop */}
                  <div
                    className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl shrink-0 mt-0.5"
                    style={{ backgroundColor: 'rgba(140,115,85,0.08)', border: '1px solid rgba(140,115,85,0.15)' }}
                  >
                    <img src={assets.parcel_icon} alt="parcel" className="w-5 h-5 opacity-60" />
                  </div>

                  {/* Main info */}
                  <div className="min-w-0">
                    {/* Mobile: icon + date row */}
                    <div className="flex items-center gap-2 sm:hidden mb-2">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                        style={{ backgroundColor: 'rgba(140,115,85,0.08)', border: '1px solid rgba(140,115,85,0.15)' }}
                      >
                        <img src={assets.parcel_icon} alt="parcel" className="w-4 h-4 opacity-60" />
                      </div>
                      <span className="text-xs" style={{ color: '#aaa' }}>{formatDate(order.date)}</span>
                    </div>

                    {/* Items list */}
                    <div className="space-y-0.5 mb-2.5">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-sm text-[#1A1A1A] font-medium leading-snug">
                          {item.name}
                          <span style={{ color: '#888' }}> × {item.quantity}</span>
                          {" "}
                          <span
                            className="text-[10px] font-normal px-1.5 py-0.5 rounded-md"
                            style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: '#888' }}
                          >
                            {item.size}
                          </span>
                          {i < order.items.length - 1 && (
                            <span style={{ color: '#ddd' }}>, </span>
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Customer */}
                    <p className="text-sm font-bold text-[#1A1A1A] mb-0.5">{customerName || "—"}</p>
                    {order.address.street && (
                      <p className="text-xs" style={{ color: '#888' }}>{order.address.street},</p>
                    )}
                    <p className="text-xs" style={{ color: '#888' }}>{addressLine}</p>
                    {order.address.phone && (
                      <p className="text-xs mt-0.5" style={{ color: '#aaa' }}>{order.address.phone}</p>
                    )}

                    {/* Mobile meta + dropdown */}
                    <div className="sm:hidden mt-3 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: '#555', border: '1px solid rgba(0,0,0,0.08)' }}
                        >
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </span>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: '#555', border: '1px solid rgba(0,0,0,0.08)' }}
                        >
                          {order.paymentMethod}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            order.payment
                              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                              : "text-red-600 bg-red-50 border-red-200"
                          }`}
                        >
                          {order.payment ? "Paid" : "Pending"}
                        </span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#fff', color: '#1A1A1A', border: '1px solid rgba(0,0,0,0.1)' }}
                        >
                          {currency}{order.amount}
                        </span>
                      </div>
                      <div className="relative">
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="w-full appearance-none text-xs font-semibold text-[#1A1A1A] rounded-xl pl-3 pr-7 py-2 cursor-pointer disabled:opacity-50"
                          style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}
                        >
                          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                      </div>
                    </div>
                  </div>

                  {/* Info rows — tablet+ */}
                  <div className="hidden sm:flex flex-col gap-1.5 pt-0.5">
                    <InfoRow label="Items"   value={order.items.length} />
                    <InfoRow label="Method"  value={order.paymentMethod} />
                    <InfoRow
                      label="Payment"
                      value={order.payment ? "Done" : "Pending"}
                      valueClass={order.payment ? "text-emerald-600" : "text-red-500"}
                    />
                    <InfoRow label="Date" value={formatDate(order.date)} valueClass="text-[#aaa]" />
                  </div>

                  {/* Amount — large screens */}
                  <div className="hidden lg:flex items-start pt-0.5">
                    <p className="text-base font-extrabold text-[#1A1A1A]">
                      {currency}{order.amount}
                    </p>
                  </div>

                  {/* Status + dropdown — tablet+ */}
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
                        className="w-full appearance-none text-xs font-semibold text-[#1A1A1A] rounded-xl pl-3 pr-7 py-2 cursor-pointer disabled:opacity-50"
                        style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }} />
                    </div>
                    {updatingId === order._id && (
                      <p className="text-[10px] font-medium animate-pulse" style={{ color: '#8C7355' }}>
                        Saving…
                      </p>
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
