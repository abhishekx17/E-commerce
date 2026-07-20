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
    <div>
      {/* Page heading */}
      <div className="mb-7">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-[#1A1A1A] prata-regular">
            Product Catalogue
          </h1>
          <span
            className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: 'rgba(140,115,85,0.1)',
              color: '#8C7355',
              border: '1px solid rgba(140,115,85,0.2)',
            }}
          >
            {list.length} {list.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        <div className="mt-2 h-px w-16" style={{ backgroundColor: '#8C7355' }} />
      </div>

      {/* Empty state */}
      {list.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-3 py-20 rounded-2xl"
          style={{
            border: '2px dashed rgba(140,115,85,0.2)',
            backgroundColor: 'rgba(140,115,85,0.02)',
          }}
        >
          <PackageSearch size={40} strokeWidth={1.2} style={{ color: 'rgba(140,115,85,0.4)' }} />
          <p className="text-sm font-medium" style={{ color: '#aaa' }}>No products in catalogue</p>
          <p className="text-xs" style={{ color: '#ccc' }}>Add your first product to get started</p>
        </div>
      ) : (
        <>
          {/* ── Desktop table ── */}
          <div
            className="hidden md:block rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-[80px_3fr_1fr_1fr_80px] items-center gap-4 px-5 py-3 text-[10px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: 'rgba(140,115,85,0.06)', borderBottom: '1px solid rgba(140,115,85,0.1)', color: '#8C7355' }}
            >
              <span>Image</span>
              <span>Name</span>
              <span>Category</span>
              <span>Price</span>
              <span className="text-center">Remove</span>
            </div>

            <div style={{ backgroundColor: '#fff' }}>
              {list.map((item, idx) => (
                <div
                  key={item._id}
                  className="grid grid-cols-[80px_3fr_1fr_1fr_80px] items-center gap-4 px-5 py-3.5 transition-colors duration-150"
                  style={{
                    borderBottom: idx < list.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(140,115,85,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {item.image?.[0] ? (
                    <img
                      className="w-12 h-12 object-cover rounded-xl"
                      style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                      src={item.image[0]}
                      alt={item.name}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-xl"
                      style={{ border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#f5f4f2' }}
                    >
                      <ImageOff size={16} style={{ color: '#ccc' }} />
                    </div>
                  )}

                  <p className="text-sm font-medium text-[#1A1A1A] truncate pr-2">{item.name}</p>

                  <span
                    className="w-fit text-[11px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(140,115,85,0.08)',
                      color: '#8C7355',
                      border: '1px solid rgba(140,115,85,0.15)',
                    }}
                  >
                    {item.category}
                  </span>

                  <p className="text-sm font-bold text-[#1A1A1A]">
                    {currency}{item.price}
                  </p>

                  <button
                    onClick={() => removeProduct(item._id)}
                    className="flex items-center justify-center mx-auto w-8 h-8 rounded-lg transition-all duration-200"
                    style={{ color: '#ccc', border: '1px solid transparent' }}
                    title="Remove product"
                    aria-label={`Remove ${item.name}`}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#ef4444';
                      e.currentTarget.style.backgroundColor = '#fef2f2';
                      e.currentTarget.style.borderColor = '#fecaca';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#ccc';
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mobile card list ── */}
          <div className="flex flex-col gap-3 md:hidden">
            {list.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 rounded-2xl p-3.5"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                }}
              >
                {item.image?.[0] ? (
                  <img
                    className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                    style={{ border: '1px solid rgba(0,0,0,0.08)' }}
                    src={item.image[0]}
                    alt={item.name}
                  />
                ) : (
                  <div
                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{ border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#f5f4f2' }}
                  >
                    <ImageOff size={18} style={{ color: '#ccc' }} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A1A] truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(140,115,85,0.08)',
                        color: '#8C7355',
                        border: '1px solid rgba(140,115,85,0.15)',
                      }}
                    >
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-[#1A1A1A]">
                      {currency}{item.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeProduct(item._id)}
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 flex-shrink-0"
                  style={{ color: '#ccc', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#f9f8f6' }}
                  aria-label={`Remove ${item.name}`}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#ef4444';
                    e.currentTarget.style.backgroundColor = '#fef2f2';
                    e.currentTarget.style.borderColor = '#fecaca';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#ccc';
                    e.currentTarget.style.backgroundColor = '#f9f8f6';
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                  }}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;