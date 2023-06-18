import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";

function Table() {
  return (
    <div className="mt-4 px-4 w-full">
      <table className="w-full h-full capitalize">
        <thead className="bg-slate-200">
          <tr className="">
            <th className="border border-r-slate-400 border-b-slate-400">id</th>
            <th className="border border-r-slate-400 border-b-slate-400">
              order id
            </th>
            <th className="border border-r-slate-400 border-b-slate-400">
              product name
            </th>
            <th className="border border-r-slate-400 border-b-slate-400">
              product image
            </th>
            <th className="border border-r-slate-400 border-b-slate-400">
              customer
            </th>
            <th className="border border-b-slate-400">actions</th>
          </tr>
        </thead>
        <tbody className="text-center leading-9">
          <tr>
            <td className="border border-r-slate-400 border-b-slate-400">1</td>
            <td className="border border-r-slate-400 border-b-slate-400">
              284782472
            </td>
            <td className="border border-r-slate-400 border-b-slate-400">
              black shirt
            </td>
            <td className="border border-r-slate-400 border-b-slate-400">
              img here
            </td>
            <td className="border border-r-slate-400 border-b-slate-400">
              John Doe
            </td>
            <td className="border border-b-slate-400 flex items-center justify-center h-full">
              <PencilIcon
                width={20}
                className="mx-auto cursor-pointer text-green-500"
              />
              <TrashIcon
                width={20}
                className="mx-auto cursor-pointer text-red-500"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
