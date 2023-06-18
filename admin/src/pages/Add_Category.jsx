import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { addCategory } from "../redux/category/categorySlice";

function Add_Category() {
  const dispatch = useDispatch();

  const [catData, setCatData] = useState({
    name: "",
  });

  const handleCategory = (e) => {
    e.preventDefault();
    dispatch(addCategory({ catData }));
  };

  const { name } = catData;

  const handleChange = (e) => {
    setCatData({ ...catData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (!localStorage.getItem("admin")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-center w-full p-3">
        <div className="w-[70%]">
          <form className="p-4 bg-slate-50 shadow-md" onSubmit={handleCategory}>
            <div className="flex justify-between gap-2 mt-3 md:!flex-wrap md:gap-0">
              <div className="!w-full sm:text-sm">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Category Name"
                  className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
                />
              </div>
            </div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setCatData({ ...catData, image: base64 })}
            />
            <button className="px-5 py-2 text-base text-white bg-blue-600 capitalize inline-block mt-2 sm:py-2 sm:px-4 sm:text-sm">
              add category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Add_Category;
