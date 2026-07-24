import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "pages/Collection";
import About from "pages/About";
import Contact from "pages/Contact";
import Product from "pages/Product";
import Cart from "pages/Cart";
import Login from "pages/Login";
import PlaceOrder from "pages/PlaceOrder";
import Orders from "pages/Orders";
import Profile from "pages/Profile";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import SearchBar from "components/SearchBar";
import ScrollToTop from "components/ScrollToTop";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#121212] selection:bg-[#8C7355] selection:text-white relative">
      <ToastContainer position="top-right" autoClose={2500} theme="light" />
      <ScrollToTop />

      {/* Floating Animated Navbar */}
      <Navbar />
      <SearchBar />

      {/* Main page content container with top spacing for floating navbar */}
      <main className="pt-24 sm:pt-28 pb-12 px-4 sm:px-[5vw] md:px-[6vw] lg:px-[8vw] max-w-[1500px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

