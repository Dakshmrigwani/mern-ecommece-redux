import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = adminData;

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginAdmin({ adminData }));
    navigate("/");
  };

  useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (localStorage.getItem("admin")) {
      localStorage.getItem("admin");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-[80vh] max-w-xl mt-4 mx-auto">
      <div className="w-full p-3">
        <form className="mt-5 p-4 bg-slate-50 shadow-md" onSubmit={handleLogin}>
          <h2 className="text-[21px] capitalize font-medium sm:text-[15px]">
            <span className="text-pink-400"> welcome </span> back, Admin
          </h2>
          <div className="mt-3">
            <div className="w-full">
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={handleChange}
                className="!w-full p-2 my-2 placeholder:text-sm focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleChange}
                className="!w-full p-2 my-2 placeholder:text-sm focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
            </div>
            <button className="capitalize text-lg inline-block mt-2 bg-blue-600 text-white px-9 py-2 sm:text-sm sm:px-6">
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
