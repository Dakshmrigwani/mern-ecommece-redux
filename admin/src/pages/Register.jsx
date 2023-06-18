import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex items-center justify-center h-[80vh] w-full p-3 md:h-[70vh]">
      <div>
        <form className="mt-5 p-4 bg-slate-50 shadow-md md:mt-16">
          <h2 className="text-[21px] capitalize font-medium sm:text-[15px]">
            <span className="text-pink-400"> join us </span> to start touring
            the world
          </h2>
          <div className="flex justify-between gap-2 mt-3 md:!flex-wrap md:gap-0">
            <div className="w-[49%] md:!w-full sm:text-sm">
              <input
                type="text"
                placeholder="Enter name"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="text"
                placeholder="Enter email"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
            </div>
            <div className="w-[49%] md:!w-full sm:text-sm">
              <input
                type="password"
                placeholder="Enter password"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
            </div>
          </div>
          <input
            type="file"
            placeholder="choose photo"
            className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
          />
          <button className="px-7 py-2 text-base text-white bg-blue-600 capitalize inline-block mt-2 sm:py-2 sm:px-5 sm:text-sm">
            register
          </button>
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-pink-400 hover:duration-300 ml-3 sm:block sm:ml-0 sm:mt-3"
          >
            already an account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
