import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { sidebarBtn } from "../redux/navSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarHandler = () => {
    dispatch(sidebarBtn());
  };

  const adminInfo = localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null;

  const logoutAdmin = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };
  return (
    <header className="sticky top-0 left-0 right-0 bottom-0 bg-white z-10 border border-b-slate-200">
      <div className="flex items-center justify-between common_sec">
        <div className="w-full flex items-center gap-4">
          <MenuIcon
            width={20}
            height={20}
            onClick={sidebarHandler}
            className="bg-slate-100 border border-slate-200 w-9 h-9 p-2 cursor-pointer"
          />
          <Link className="uppercase font-medium text-lg text-black">
            Admin Panel
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link className="uppercase font-medium text-lg"> shop </Link>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-200 border border-slate-200 capitalize bg-opacity-30 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <h3 className="text-black text-lg">
                  {adminInfo && adminInfo?.username}
                </h3>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-5 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "text-black" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-3 text-sm`}
                    >
                      Account
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "text-black" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-3 text-sm`}
                    >
                      Notificaions
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "text-black" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-3 text-sm`}
                      onClick={logoutAdmin}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
