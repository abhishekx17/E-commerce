import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

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

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
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
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-4 sm:gap-5 max-w-3xl"
    >
      <div>
        <p className="mb-2 font-medium text-gray-700">Upload Image</p>

        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <label htmlFor="image1" className="cursor-pointer">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-dashed border-gray-300 hover:border-gray-400 transition-colors"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2" className="cursor-pointer">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-dashed border-gray-300 hover:border-gray-400 transition-colors"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3" className="cursor-pointer">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-dashed border-gray-300 hover:border-gray-400 transition-colors"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4" className="cursor-pointer">
            <img
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border border-dashed border-gray-300 hover:border-gray-400 transition-colors"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-medium text-gray-700">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full sm:max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 transition-colors"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 font-medium text-gray-700">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full sm:max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 transition-colors resize-none"
          rows={5}
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-8 w-full">
        <div>
          <p className="mb-2 font-medium text-gray-700">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 transition-colors"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-medium text-gray-700">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 transition-colors"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium text-gray-700">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-gray-500 transition-colors"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium text-gray-700">Product Sizes</p>

        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size],
                )
              }
              className={`px-4 py-1.5 rounded-md cursor-pointer border transition-all select-none
          ${
            sizes.includes(size)
              ? "bg-orange-100 border-orange-600 text-orange-600"
              : "bg-slate-100 border-slate-200 hover:bg-slate-200"
          }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4 accent-black cursor-pointer"
        />
        <label className="cursor-pointer text-gray-700" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-36 py-3 mt-3 text-white rounded-md font-medium flex items-center justify-center gap-2 transition-all
    ${
      loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-gray-800"
    }`}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        {loading ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
