import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import FileBase from "react-file-base64";
import { addProducts } from "../redux/product/productSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add_Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get("http://localhost:5000/api/categories");
      setCategories(result.data);
    };
    fetchCategories();
  }, []);

  const { error } = useSelector((state) => ({ ...state.prodReducer }));

  useEffect(() => {
    error && swal("Error", error, "error");
  }, [error]);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    desc: "",
  });
  const { name, price, category, desc } = productData;
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const addProductHandler = (e) => {
    e.preventDefault();
    dispatch(addProducts({ productData }));
    handleClear();
  };

  const handleClear = () => {
    setProductData({
      name: "",
      price: "",
      category: "",
      desc: "",
    });
  };

  useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (!localStorage.getItem("admin")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="">
      <div className="flex items-center justify-center w-full p-3">
        <div className="w-full">
          <form
            className="p-4 bg-slate-50 shadow-md"
            onSubmit={addProductHandler}
          >
            <div className="flex justify-between gap-2 mt-3 md:!flex-wrap md:gap-0">
              <div className="!w-full sm:text-sm">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Product Price"
                  className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
                  name="price"
                  value={price}
                  onChange={handleChange}
                />
                <select
                  className="w-full p-2 my-2 border-[1px] border-slate-200 shadow-sm capitalize focus:outline-none"
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    please select category
                  </option>
                  {categories?.categories?.map((category) => (
                    <Fragment key={category._id}>
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    </Fragment>
                  ))}
                </select>
              </div>
            </div>
            <textarea
              cols="30"
              rows="4"
              placeholder="Product description"
              className="w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              name="desc"
              value={desc}
              onChange={handleChange}
            ></textarea>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setProductData({ ...productData, image: base64 })
              }
            />
            <button className="px-5 py-2 text-base text-white bg-blue-600 capitalize inline-block mt-2 sm:py-2 sm:px-4 sm:text-sm">
              add product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add_Products;
