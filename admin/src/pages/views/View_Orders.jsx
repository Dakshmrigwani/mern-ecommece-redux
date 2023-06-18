import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../extras/Table";

function View_Orders() {
  const navigate = useNavigate();

  useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (!localStorage.getItem("admin")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <div className="px-4 mt-5 flex items-center justify-between">
        <h2 className="text-lg shadow-md py-2 px-4 inline-block bg-red-500 text-white">
          All Orders
        </h2>
      </div>
      <div className="py-2">
        <Table />
      </div>
    </>
  );
}

export default View_Orders;
