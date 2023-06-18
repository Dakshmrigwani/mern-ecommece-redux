import React from "react";
import "./Payment.scss";
import SuccessImg from "../../images/success.gif";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="success_container">
      <div className="success_box">
        <div className="img_box">
          <img src={SuccessImg} alt="" />
        </div>

        <div className="success_info">
          <h2>Thank you for purchase</h2>
          <h3> Your Order Received </h3>
          {/* <small> orderid here  </small> */}
          <Link to="/shop" className="btn">
            <span> go back to shop </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
