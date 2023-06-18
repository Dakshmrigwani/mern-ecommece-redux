import React from "react";
import "./ConfirmOrder.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ConfirmOrder() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  const { cartItems, shippingInfo } = useSelector((state) => ({
    ...state.cart,
  }));
  const navigate = useNavigate();

  const sub_total = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shipping_charge = 50;

  const grand_total = sub_total + shipping_charge;

  let Address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pincode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      sub_total,
      shipping_charge,
      grand_total,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <div className="order_conatiner">
      <div className="grid_container">
        <div className="left">
          <div className="shipping_heading">
            <h2> shipping info </h2>
          </div>

          <div className="info">
            <h3>Name: {user.name}</h3>
            <h3>Phone: {shippingInfo.phone}</h3>
            <h3>Address: {Address}</h3>
          </div>

          <div className="shipping_heading cart_items">
            <h2> your cart items</h2>
          </div>

          <div className="cart_info">
            {cartItems.map((item) => (
              <React.Fragment key={item._id}>
                <div className="cart_box">
                  <div className="cart_img">
                    <img src={item.image} alt="alt" />
                  </div>
                  <h3> {item.name} </h3>
                  <h3>
                    {item.qty} x {item.price} = {item.qty * item.price}
                  </h3>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="right">
          <div className="main_div">
            <div className="summery_heading">
              <h2> order summery </h2>
            </div>
          </div>

          <div className="summery">
            <div className="summery_details">
              <div className="sub_total common">
                <h3> subtotal </h3>
                <h3> $ {sub_total} </h3>
              </div>
              <div className="shipping_fee common">
                <h3> shipping </h3>
                <h3> {shipping_charge} </h3>
              </div>
              <div className="grand_total common">
                <h3> total </h3>
                <h3> $ {grand_total} </h3>
              </div>
            </div>

            <button className="payment" onClick={proceedToPayment}>
              {" "}
              proceed to payment{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
