import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 w-[289px] h-full  bg-white p-2 z-10 border border-r-slate-200 sidebar">
      {/* top */}
      <div>
        <img
          src="images/admin.png"
          alt=""
          className="h-32 w-32 object-cover mx-auto"
        />
      </div>

      {/* Links */}
      <div className="w-full pt-3">
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2 space-y-4">
          <Disclosure>
            <>
              <Disclosure.Button className="flex w-full justify-between bg-slate-100 px-2 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                <Link to="/">Dashboard</Link>
              </Disclosure.Button>
            </>
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between bg-slate-100 px-2 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span>Products</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-2 pt-2 pb-2 text-sm text-gray-500 flex flex-col space-y-2 capitalize">
                  <Link to="/add_product">add product</Link>
                  <Link to="/view_products">view products</Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between bg-slate-100 px-2 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span>Categories</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-2 pt-2 pb-2 text-sm text-gray-500 flex flex-col space-y-2 capitalize">
                  <Link to="/add_category">add category</Link>
                  <Link to="/view_category">view category</Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between bg-slate-100 px-2 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span>Orders</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-2 pt-2 pb-2 text-sm text-gray-500 flex flex-col space-y-2 capitalize">
                  <Link>manage orders</Link>
                  <Link to="/view_orders">view orders</Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between bg-slate-100 px-2 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                  <span>Users</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-slate-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-2 pt-2 pb-2 text-sm text-gray-500 flex flex-col space-y-2 capitalize">
                  <Link to="/view_users">all users</Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
