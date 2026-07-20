import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Upload } from "lucide-react";

const SIZES = ["S", "M", "L", "XL", "XXL"];

/* ── Reusable label ── */
const FieldLabel = ({ children }) => (
  <p
    className="mb-1.5 text-[10px] font-bold uppercase tracking-widest"
    style={{ color: '#8C7355' }}
  >
    {children}
  </p>
);

/* ── Image upload slot ── */
const ImageSlot = ({ id, image, onChange }) => (
  <label htmlFor={id} className="cursor-pointer group">
    <div
      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-200"
      style={{
        border: image
          ? '2px solid rgba(140,115,85,0.4)'
          : '2px dashed rgba(140,115,85,0.3)',
        backgroundColor: image ? 'transparent' : 'rgba(140,115,85,0.04)',
      }}
    >
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-1">
          <Upload size={18} style={{ color: 'rgba(140,115,85,0.5)' }} />
          <span className="text-[9px] font-medium" style={{ color: 'rgba(140,115,85,0.5)' }}>
            Upload
          </span>
        </div>
      )}
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: 'rgba(140,115,85,0.15)' }}
      >
        <Upload size={16} style={{ color: '#8C7355' }} />
      </div>
    </div>
    <input onChange={onChange} type="file" id={id} hidden accept="image/*" />
  </label>
);

/* ── Input / Select shared styles ── */
const inputStyle = {
  border: '1px solid rgba(0,0,0,0.12)',
  backgroundColor: '#fff',
  color: '#1A1A1A',
  borderRadius: '10px',
};

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName(""); setDescription(""); setPrice("");
        setImage1(false); setImage2(false);
        setImage3(false); setImage4(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1A1A1A] prata-regular">
          Add New Product
        </h1>
        <div className="mt-2 h-px w-16" style={{ backgroundColor: '#8C7355' }} />
      </div>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">

        {/* ── Images Card ── */}
        <div
          className="rounded-2xl p-6"
          style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
        >
          <FieldLabel>Product Images</FieldLabel>
          <p className="text-xs mb-4" style={{ color: '#aaa' }}>Upload up to 4 product images</p>
          <div className="flex gap-3 flex-wrap">
            <ImageSlot id="image1" image={image1} onChange={(e) => setImage1(e.target.files[0])} />
            <ImageSlot id="image2" image={image2} onChange={(e) => setImage2(e.target.files[0])} />
            <ImageSlot id="image3" image={image3} onChange={(e) => setImage3(e.target.files[0])} />
            <ImageSlot id="image4" image={image4} onChange={(e) => setImage4(e.target.files[0])} />
          </div>
        </div>

        {/* ── Details Card ── */}
        <div
          className="rounded-2xl p-6 flex flex-col gap-5"
          style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
        >
          {/* Product Name */}
          <div>
            <FieldLabel>Product Name</FieldLabel>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-3 py-2.5 text-sm"
              style={inputStyle}
              type="text"
              placeholder="e.g. Classic Oxford Shirt"
              required
            />
          </div>

          {/* Description */}
          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full px-3 py-2.5 text-sm resize-none"
              style={inputStyle}
              rows={4}
              placeholder="Describe the product — material, fit, occasion..."
              required
            />
          </div>

          {/* Category / Sub-category / Price row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <FieldLabel>Category</FieldLabel>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-sm"
                style={inputStyle}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <FieldLabel>Sub-Category</FieldLabel>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-sm"
                style={inputStyle}
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div>
              <FieldLabel>Price ($)</FieldLabel>
              <input
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2.5 text-sm"
                style={inputStyle}
                type="number"
                placeholder="0.00"
                min="0"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <FieldLabel>Available Sizes</FieldLabel>
            <div className="flex gap-2 flex-wrap mt-1">
              {SIZES.map((size) => {
                const active = sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      setSizes((prev) =>
                        prev.includes(size)
                          ? prev.filter((s) => s !== size)
                          : [...prev, size],
                      )
                    }
                    className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 select-none"
                    style={
                      active
                        ? { backgroundColor: '#8C7355', color: '#fff', border: '1px solid #8C7355' }
                        : { backgroundColor: '#fff', color: '#555', border: '1px solid rgba(0,0,0,0.15)' }
                    }
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bestseller toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBestSeller((p) => !p)}
              className="relative w-10 h-5 rounded-full transition-all duration-300 flex-shrink-0"
              style={{ backgroundColor: bestseller ? '#8C7355' : 'rgba(0,0,0,0.15)' }}
              role="switch"
              aria-checked={bestseller}
            >
              <span
                className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300"
                style={{ left: bestseller ? '1.25rem' : '0.125rem' }}
              />
            </button>
            <span className="text-sm" style={{ color: bestseller ? '#8C7355' : '#888' }}>
              {bestseller ? 'Marked as Bestseller' : 'Add to Bestsellers'}
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="self-start flex items-center gap-2.5 px-8 py-3 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-200"
          style={{
            backgroundColor: loading ? '#b0a090' : '#1A1A1A',
            cursor: loading ? 'not-allowed' : 'pointer',
            minWidth: '160px',
            justifyContent: 'center',
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#8C7355'; }}
          onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#1A1A1A'; }}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? 'Publishing…' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
};

export default Add;
