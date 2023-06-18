import { TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../redux/category/categoryService";
import swal from "sweetalert";

function View_Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const result = await axios.get("http://localhost:5000/api/categories");
    setCategories(result.data.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (!localStorage.getItem("admin")) {
      navigate("/login");
    }
  }, [navigate]);

  const removeCategory = async (id) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((p) => p._id !== id));
    swal("Deleted!", "Category has been deleted!", "success");
  };

  return (
    <>
      <div className="px-4 mt-5 flex items-center justify-between">
        <h2 className="text-lg shadow-md py-2 px-4 inline-block bg-red-500 text-white">
          All Categories
        </h2>
        <Link
          to="/add_category"
          className="text-lg shadow-md py-2 px-4 inline-block bg-green-500 text-white"
        >
          Add Category
        </Link>
      </div>
      <div className="mt-4 px-4 w-full">
        {categories.length == 0 ? (
          <h2 className="text-2xl p-3 bg-white text-green-500 border border-green-400 w-[40%] text-center mx-auto">
            No Categories Found !
          </h2>
        ) : (
          <table className="w-full h-full capitalize">
            <thead className="bg-slate-200">
              <tr className="">
                <th className="border border-r-slate-400 border-b-slate-400">
                  id
                </th>
                <th className="border border-r-slate-400 border-b-slate-400">
                  category name
                </th>
                <th className="border border-r-slate-400 border-b-slate-400">
                  category image
                </th>
                <th className="border border-b-slate-400">actions</th>
              </tr>
            </thead>
            <tbody className="text-center leading-9">
              {categories.map((category) => (
                <Fragment key={category._id}>
                  <tr key={category._id}>
                    <td className="border border-r-slate-400 border-b-slate-400">
                      {category._id}
                    </td>
                    <td className="border border-r-slate-400 border-b-slate-400">
                      {category.name}
                    </td>
                    <td className="border border-r-slate-400 border-b-slate-400 p-2">
                      <img
                        src={category.image}
                        alt="/"
                        className="w-24 h-24 object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-b-slate-400 h-full">
                      <TrashIcon
                        width={20}
                        onClick={() => removeCategory(category._id)}
                        className="mx-auto cursor-pointer text-red-500"
                      />
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default View_Category;
