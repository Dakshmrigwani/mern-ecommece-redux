import {
  ArchiveIcon,
  CheckCircleIcon,
  CollectionIcon,
  UserIcon,
} from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../extras/Table";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (!localStorage.getItem("admin")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="p-4 !px-4">
        <div className="connon_sec grid grid-cols-4 gap-2 xl:grid-cols-2 sm:grid-cols-1">
          <div className="w-full bg-slate-200 py-5 px-5 flex items-center gap-3 bg-opacity-80 shadow-md">
            <ArchiveIcon
              width={70}
              height={70}
              className="bg-white p-3 bg-opacity-70 rounded-full"
            />
            <div className="flex flex-col ml-1">
              <h2 className="text-2xl font-medium uppercase"> Products </h2>
              <span className="text-xl font-medium text-center">
                <div className="text-3xl inline-block !text-center mt-3 h-14 w-14 bg-white bg-opacity-50 rounded-full border border-green-500 text-green-500">
                  <span className="inline-block mt-2"> 10 </span>
                </div>
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-200 py-5 px-5 flex items-center gap-3 bg-opacity-80 shadow-md">
            <CollectionIcon
              width={70}
              height={70}
              className="bg-white p-3 bg-opacity-70 rounded-full"
            />
            <div className="flex flex-col ml-1">
              <h2 className="text-2xl font-medium uppercase"> Category </h2>
              <span className="text-xl font-medium text-center">
                <div className="text-3xl inline-block !text-center mt-3 h-14 w-14 bg-white bg-opacity-50 rounded-full border border-green-500 text-green-500">
                  <span className="inline-block mt-2"> 05 </span>
                </div>
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-200 py-5 px-5 flex items-center gap-3 bg-opacity-80 shadow-md">
            <CheckCircleIcon
              width={70}
              height={70}
              className="bg-white p-3 bg-opacity-70 rounded-full"
            />
            <div className="flex flex-col ml-5">
              <h2 className="text-2xl font-medium uppercase"> Orders </h2>
              <span className="text-xl font-medium text-center">
                <div className="text-3xl inline-block !text-center mt-3 h-14 w-14 bg-white bg-opacity-50 rounded-full border border-green-500 text-green-500">
                  <span className="inline-block mt-2"> 80 </span>
                </div>
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-200 py-5 px-5 flex items-center gap-3 bg-opacity-80 shadow-md">
            <UserIcon
              width={70}
              height={70}
              className="bg-white p-3 bg-opacity-70 rounded-full"
            />
            <div className="flex flex-col ml-8">
              <h2 className="text-2xl font-medium uppercase"> Users </h2>
              <span className="text-xl font-medium text-center">
                <div className="text-3xl inline-block !text-center mt-3 h-14 w-14 bg-white bg-opacity-50 rounded-full border border-green-500 text-green-500">
                  <span className="inline-block mt-2"> 20 </span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <h2 className="text-lg shadow-md py-2 px-4 inline-block bg-red-500 text-white">
          Recent Order's
        </h2>
      </div>
      <Table />
    </>
  );
}

export default Dashboard;
