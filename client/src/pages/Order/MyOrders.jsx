import React, { Fragment, useEffect } from "react";
import "./MyOrders.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders } from "../../redux/order/orderSlice";
import { Link } from "react-router-dom";

function MyOrders() {
  const { userOrders } = useSelector((state) => ({ ...state.order }));

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      dispatch(getUserOrders());
    }
  }, [dispatch]);

  return (
    <div className="orders_container">
      <div className="heading">
        <h1>Your All Orders</h1>
      </div>

      <div className="orders_table">
        <div className="row header">
          <div className="cell">Order_ID</div>
          <div className="cell">Status</div>
          <div className="cell">Items Quantity</div>
          <div className="cell">Total Amount</div>
        </div>
        {userOrders?.orders?.map((order) => (
          <Fragment key={order._id}>
            <div className="row">
              <div className="cell" data-title="Order_ID">
                {order._id}
              </div>
              <div className="cell" data-title="Status">
                {order.orderStatus === "Processing" && (
                  <span style={{ color: "#E6CF27" }}>{order.orderStatus}</span>
                )}
                {order.orderStatus === "Shipping" && (
                  <span style={{ color: "#E55324" }}>{order.orderStatus}</span>
                )}
                {order.orderStatus === "Delivered" && (
                  <span style={{ color: "#40B84B" }}>{order.orderStatus}</span>
                )}
              </div>
              <div className="cell" data-title="Items Quantity">
                {order.orderItems.length}
              </div>
              <div className="cell" data-title="Total Amount">
                ${order.totalPrice}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <Link to="/">
        <div className="heading back">
          <h1>go back</h1>
        </div>
      </Link>
    </div>
  );
}

export default MyOrders;
