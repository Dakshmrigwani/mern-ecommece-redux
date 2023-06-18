import { TrashIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function View_Users() {
  const navigate = useNavigate();

  useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (!localStorage.getItem("admin")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="px-4 mt-5">
        <h2 className="text-lg shadow-md py-2 px-4 inline-block bg-red-500 text-white">
          All Users
        </h2>
      </div>
      <div className="mt-4 px-4 w-full">
        <table className="w-full h-full">
          <thead className="bg-slate-200 capitalize">
            <tr className="">
              <th className="border border-r-slate-400 border-b-slate-400">
                id
              </th>
              <th className="border border-r-slate-400 border-b-slate-400">
                user name
              </th>
              <th className="border border-r-slate-400 border-b-slate-400">
                user email
              </th>
              <th className="border border-r-slate-400 border-b-slate-400">
                user phone
              </th>
              <th className="border border-b-slate-400">actions</th>
            </tr>
          </thead>
          <tbody className="text-center leading-9">
            <tr>
              <td className="border border-r-slate-400 border-b-slate-400">
                1
              </td>
              <td className="border border-r-slate-400 border-b-slate-400">
                harry wales
              </td>
              <td className="border border-r-slate-400 border-b-slate-400">
                harry@test.com
              </td>
              <td className="border border-r-slate-400 border-b-slate-400">
                2874678462
              </td>
              <td className="border border-b-slate-400 h-full">
                <TrashIcon
                  width={20}
                  className="mx-auto cursor-pointer text-red-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default View_Users;
