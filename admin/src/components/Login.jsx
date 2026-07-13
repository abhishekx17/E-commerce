import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl px-8 py-10 w-full max-w-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to manage your store
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="rounded-lg w-full pl-10 pr-3 py-2.5 border border-gray-300 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="rounded-lg w-full pl-10 pr-3 py-2.5 border border-gray-300 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            className="mt-2 w-full py-2.5 px-4 rounded-lg text-white bg-black hover:bg-gray-800 active:scale-[0.99] transition-all font-medium"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;