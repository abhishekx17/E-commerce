import axios from "axios";
import Title from "components/Title";
import { ShopContext } from "context/ShopContext";
import React, { useContext, useEffect, useState } from "react";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 pb-16">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="flex flex-col gap-4">
        {orderData.length === 0 ? (
          <p className="text-gray-400 text-sm py-10 text-center">
            No orders found.
          </p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white"
            >
              {/* Left: image + details */}
              <div className="flex items-start gap-4">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0 bg-gray-100"
                />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 text-base mb-1">
                    {item.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500">
                    <span className="text-gray-900 font-medium">
                      {currency}{item.price}
                    </span>
                    <span>Qty: {item.quantity}</span>
                    <span>Size: {item.size}</span>
                  </div>
                  <p className="mt-1 text-gray-400 text-xs">
                    {new Date(item.date).toDateString()} &middot; {item.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Right: status + button */}
              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 sm:min-w-[140px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className="text-xs border border-gray-300 rounded px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
