import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";
import { assets } from "../assets/assets";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center w-full px-4"
      style={{ backgroundColor: "#FAF9F7" }}
    >
      {/* Subtle background texture blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(140,115,85,0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(140,115,85,0.1) 0%, transparent 70%)' }}
        />
      </div>

      <div
        className="relative w-full max-w-sm rounded-2xl px-8 py-10"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={assets.logo} alt="Velora" className="h-10 w-auto object-contain" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#1A1A1A] prata-regular">
            Welcome Back
          </h1>
          <p className="text-sm mt-1.5" style={{ color: '#888' }}>
            Sign in to your admin dashboard
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
              style={{ color: '#8C7355' }}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={16}
                style={{ color: '#aaa' }}
              />
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl"
                style={{
                  border: '1px solid rgba(0,0,0,0.12)',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#1A1A1A',
                }}
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-widest mb-1.5"
              style={{ color: '#8C7355' }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={16}
                style={{ color: '#aaa' }}
              />
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl"
                style={{
                  border: '1px solid rgba(0,0,0,0.12)',
                  background: 'rgba(255,255,255,0.9)',
                  color: '#1A1A1A',
                }}
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            className="w-full py-2.5 px-4 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-200 mt-2 flex items-center justify-center gap-2"
            style={{
              backgroundColor: loading ? '#b0a090' : '#8C7355',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#7a6348'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#8C7355'; }}
            type="submit"
            disabled={loading}
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Footer note */}
        <p className="text-center text-[11px] mt-6" style={{ color: '#bbb' }}>
          Velora Admin · Restricted Access
        </p>
      </div>
    </div>
  );
};

export default Login;