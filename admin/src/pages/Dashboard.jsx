import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Package, ShoppingBag, TrendingUp, Clock, CheckCircle2, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ── Stat Card ── */
const StatCard = ({ icon: Icon, label, value, sub, accent, onClick }) => (
  <button
    onClick={onClick}
    className="text-left w-full rounded-2xl p-5 transition-all duration-200 group"
    style={{
      backgroundColor: '#fff',
      border: '1px solid rgba(0,0,0,0.07)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = `${accent}44`;
      e.currentTarget.style.boxShadow = `0 6px 24px ${accent}18`;
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)';
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
      style={{ backgroundColor: `${accent}14`, border: `1px solid ${accent}28` }}
    >
      <Icon size={20} style={{ color: accent }} strokeWidth={1.8} />
    </div>
    <p className="text-2xl font-bold text-[#1A1A1A]">{value}</p>
    <p className="text-sm font-medium mt-0.5" style={{ color: '#888' }}>{label}</p>
    {sub && <p className="text-xs mt-1" style={{ color: '#bbb' }}>{sub}</p>}
  </button>
);

/* ── Order status badge ── */
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
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders]     = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, ordRes] = await Promise.all([
          axios.get(backendUrl + "/api/product/list"),
          axios.post(backendUrl + "/api/order/list", {}, { headers: { token } }),
        ]);
        if (prodRes.data.success) setProducts(prodRes.data.products);
        if (ordRes.data.success)  setOrders([...ordRes.data.orders].reverse());
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  /* Derived stats */
  const totalRevenue    = orders.filter(o => o.payment).reduce((s, o) => s + o.amount, 0);
  const pendingOrders   = orders.filter(o => o.status !== "Delivered").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const recentOrders    = orders.slice(0, 5);

  if (loading) {
    return (
      <div className="max-w-5xl">
        <div className="mb-8">
          <div className="h-8 w-48 rounded-lg animate-pulse" style={{ backgroundColor: 'rgba(140,115,85,0.12)' }} />
          <div className="mt-2 h-px w-16" style={{ backgroundColor: '#8C7355' }} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(n => (
            <div key={n} className="rounded-2xl p-5 animate-pulse" style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', height: '140px' }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1A1A1A] prata-regular">
          Dashboard
        </h1>
        <div className="mt-2 h-px w-16" style={{ backgroundColor: '#8C7355' }} />
        <p className="text-sm mt-2" style={{ color: '#aaa' }}>
          Welcome back — here's what's happening with your store.
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Package}
          label="Total Products"
          value={products.length}
          sub="In catalogue"
          accent="#8C7355"
          onClick={() => navigate("/list")}
        />
        <StatCard
          icon={ShoppingBag}
          label="Total Orders"
          value={orders.length}
          sub="All time"
          accent="#6366f1"
          onClick={() => navigate("/orders")}
        />
        <StatCard
          icon={Clock}
          label="Pending Orders"
          value={pendingOrders}
          sub="Not yet delivered"
          accent="#f59e0b"
          onClick={() => navigate("/orders")}
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue"
          value={`${currency}${totalRevenue.toLocaleString()}`}
          sub="From paid orders"
          accent="#10b981"
          onClick={() => navigate("/orders")}
        />
      </div>

      {/* ── Two column: recent orders + quick stats ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent orders */}
        <div
          className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
          >
            <h2 className="text-sm font-bold tracking-wide text-[#1A1A1A]">Recent Orders</h2>
            <button
              onClick={() => navigate("/orders")}
              className="text-xs font-semibold transition-colors duration-200"
              style={{ color: '#8C7355' }}
            >
              View all →
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm" style={{ color: '#ccc' }}>No orders yet</p>
            </div>
          ) : (
            <div>
              {recentOrders.map((order, idx) => {
                const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG["Order placed"];
                const name = `${order.address?.firstname || ""} ${order.address?.lastname || ""}`.trim();
                return (
                  <div
                    key={order._id}
                    className="flex items-center gap-4 px-5 py-3.5 transition-colors duration-150 cursor-pointer"
                    style={{ borderBottom: idx < recentOrders.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}
                    onClick={() => navigate("/orders")}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(140,115,85,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {/* Icon */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(140,115,85,0.08)', border: '1px solid rgba(140,115,85,0.15)' }}
                    >
                      <ShoppingBag size={14} style={{ color: '#8C7355' }} strokeWidth={1.8} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1A1A1A] truncate">
                        {name || "Customer"}
                      </p>
                      <p className="text-xs truncate" style={{ color: '#aaa' }}>
                        {order.items.map(i => i.name).join(", ")}
                      </p>
                    </div>

                    {/* Amount */}
                    <p className="text-sm font-bold text-[#1A1A1A] flex-shrink-0">
                      {currency}{order.amount}
                    </p>

                    {/* Status badge */}
                    <div className={`hidden sm:flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${cfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {order.status}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right panel: order breakdown + quick actions */}
        <div className="flex flex-col gap-4">

          {/* Order breakdown */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <h2 className="text-sm font-bold tracking-wide text-[#1A1A1A] mb-4">Order Status</h2>
            <div className="space-y-3">
              {[
                { label: "Delivered",        count: deliveredOrders,   color: "#10b981", Icon: CheckCircle2 },
                { label: "In Transit",       count: orders.filter(o => o.status === "Shipped" || o.status === "Out for delivery").length, color: "#6366f1", Icon: Truck },
                { label: "Processing",       count: orders.filter(o => o.status === "Order placed" || o.status === "Packing").length, color: "#f59e0b", Icon: Clock },
              ].map(({ label, count, color, Icon: Ic }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color}14` }}
                  >
                    <Ic size={14} style={{ color }} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium" style={{ color: '#555' }}>{label}</span>
                      <span className="text-xs font-bold text-[#1A1A1A]">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: orders.length ? `${(count / orders.length) * 100}%` : '0%',
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <h2 className="text-sm font-bold tracking-wide text-[#1A1A1A] mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate("/add")}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: '#1A1A1A' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#8C7355'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1A1A1A'}
              >
                + Add New Product
              </button>
              <button
                onClick={() => navigate("/list")}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: 'rgba(140,115,85,0.07)',
                  color: '#8C7355',
                  border: '1px solid rgba(140,115,85,0.2)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(140,115,85,0.14)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(140,115,85,0.07)';
                }}
              >
                View Catalogue
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
