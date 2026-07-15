import CartTotal from "components/CartTotal";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useState } from "react";

/* ── inline SVG icons (no extra deps) ── */
const MinusIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
    <path fillRule="evenodd" d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
  </svg>
);
const EmptyBagIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-20 mx-auto opacity-20">
    <rect x="10" y="20" width="44" height="36" rx="4" />
    <path d="M22 20v-4a10 10 0 0120 0v4" />
  </svg>
);

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleRemove = (itemId, size) => {
    const key = `${itemId}-${size}`;
    setRemovingId(key);
    setTimeout(() => {
      updateQuantity(itemId, size, 0);
      setRemovingId(null);
    }, 280);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.size, item.quantity - 1);
    } else {
      handleRemove(item._id, item.size);
    }
  };

  return (
    <div className="min-h-[70vh] pt-10 pb-24">
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-[#1A1A1A]">
          Shopping Cart
          {cartData.length > 0 && (
            <span className="ml-2 text-xs sm:text-sm font-normal text-[#888] align-middle">
              ({cartData.length} {cartData.length === 1 ? "item" : "items"})
            </span>
          )}
        </h1>
        <div className="mt-2 h-px bg-gradient-to-r from-[#1A1A1A]/10 via-[#8C7355]/20 to-transparent" />
      </div>

      {cartData.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-24 gap-5">
          <EmptyBagIcon />
          <p className="text-[#888] text-sm tracking-wide">Your cart is empty</p>
          <button
            onClick={() => navigate("/collection")}
            className="mt-2 px-7 py-2.5 bg-[#1A1A1A] text-white text-xs tracking-[0.15em] uppercase rounded-full hover:bg-[#8C7355] transition-colors duration-300"
          >
            Browse Collection
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── Cart items ── */}
          <div className="flex-1 flex flex-col gap-3">
            {cartData.map((item) => {
              const productData = products.find((p) => p._id === item._id);
              if (!productData) return null;
              const key = `${item._id}-${item.size}`;
              const isRemoving = removingId === key;

              return (
                <div
                  key={key}
                  style={{
                    opacity: isRemoving ? 0 : 1,
                    transform: isRemoving ? "translateX(24px)" : "translateX(0)",
                    transition: "opacity 0.28s ease, transform 0.28s ease",
                  }}
                  className="group flex items-center gap-3 bg-white rounded-xl p-3 sm:p-4 border border-[#EBEBEB] transition-colors duration-200 hover:border-[#D8D5D0]"
                >
                  {/* Product image */}
                  <div className="flex-shrink-0 w-16 h-20 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-[#F5F4F2]">
                    <img
                      src={productData.image[0]}
                      alt={productData.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    {/* Name + price row */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-[#1A1A1A] text-xs sm:text-sm leading-snug line-clamp-2 flex-1">
                        {productData.name}
                      </p>
                      {/* Remove button — top-right on all sizes */}
                      <button
                        onClick={() => handleRemove(item._id, item.size)}
                        className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-[#AAA] hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                        aria-label="Remove item"
                      >
                        <TrashIcon />
                      </button>
                    </div>

                    {/* Size + unit price */}
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] sm:text-xs text-[#888] border border-[#E0DDD8] bg-[#FAF9F7] rounded-full px-2 py-0.5 font-medium tracking-wide">
                        {item.size}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                        {currency}{productData.price}
                      </span>
                    </div>

                    {/* Stepper + subtotal */}
                    <div className="flex items-center justify-between mt-2.5 gap-2">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#E0DDD8] rounded-full overflow-hidden bg-[#FAF9F7]">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="w-7 h-7 flex items-center justify-center text-[#555] hover:text-[#1A1A1A] hover:bg-black/5 transition-colors duration-150"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-[#1A1A1A] select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#555] hover:text-[#1A1A1A] hover:bg-black/5 transition-colors duration-150"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-[10px] sm:text-xs text-[#888] text-right">
                        <span className="font-semibold text-[#1A1A1A] text-xs sm:text-sm">
                          {currency}{(productData.price * item.quantity).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Order summary ── */}
          <div className="w-full lg:w-[360px] flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl p-4 sm:p-6 border border-[#EBEBEB]">
              <h2 className="text-sm font-semibold tracking-[0.12em] uppercase text-[#1A1A1A] mb-5">
                Order Summary
              </h2>
              <CartTotal />

              <button
                onClick={() => navigate("/place-order")}
                className="mt-6 w-full py-3.5 rounded-xl bg-[#1A1A1A] text-white text-xs tracking-[0.18em] uppercase font-medium hover:bg-[#8C7355] transition-colors duration-300 active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/collection")}
                className="mt-3 w-full py-2.5 rounded-xl border border-[#E0DDD8] text-[#888] text-xs tracking-[0.15em] uppercase hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
