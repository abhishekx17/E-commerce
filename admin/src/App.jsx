import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";

export const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");

export const currency = '$'

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : "",
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF9F7" }}>
      <ToastContainer position="top-right" autoClose={2500} />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 min-w-0 px-4 sm:px-8 lg:px-10 my-8 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
