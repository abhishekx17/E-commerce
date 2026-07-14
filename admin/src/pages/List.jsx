import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Trash2, PackageSearch, ImageOff } from "lucide-react";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
          {list.length} {list.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Empty state */}
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 border border-dashed border-gray-300 rounded-xl text-gray-400">
          <PackageSearch size={36} strokeWidth={1.5} />
          <p className="text-sm">No products found</p>
        </div>
      ) : (
        <>
          {/* ---------- Desktop / tablet table ---------- */}
          <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-[80px_3fr_1fr_1fr_80px] items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <span>Image</span>
              <span>Name</span>
              <span>Category</span>
              <span>Price</span>
              <span className="text-center">Action</span>
            </div>

            <div className="divide-y divide-gray-100">
              {list.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-[80px_3fr_1fr_1fr_80px] items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  {item.image?.[0] ? (
                    <img
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      src={item.image[0]}
                      alt={item.name}
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-300">
                      <ImageOff size={18} />
                    </div>
                  )}

                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </p>

                  <span className="w-fit text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {item.category}
                  </span>

                  <p className="text-sm font-semibold text-gray-800">
                    {currency}
                    {item.price}
                  </p>

                  <button
                    onClick={() => removeProduct(item._id)}
                    className="flex items-center justify-center mx-auto w-8 h-8 rounded-lg border border-transparent text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors"
                    title="Remove product"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Mobile card list ---------- */}
          <div className="flex flex-col gap-3 md:hidden">
            {list.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 bg-white shadow-sm"
              >
                {item.image?.[0] ? (
                  <img
                    className="w-14 h-14 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                    src={item.image[0]}
                    alt={item.name}
                  />
                ) : (
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-300">
                    <ImageOff size={18} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {currency}
                      {item.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeProduct(item._id)}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-transparent text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors flex-shrink-0"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default List;