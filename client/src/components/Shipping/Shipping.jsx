import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../redux/cart/cartSlice";
import "./Shipping.scss";

function Shipping() {
  const { shippingInfo } = useSelector((state) => ({ ...state.cart }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = React.useState({
    city: shippingInfo.city ? shippingInfo.city : "",
    address: shippingInfo.address ? shippingInfo.address : "",
    pincode: shippingInfo.pincode ? shippingInfo.pincode : "",
    phone: shippingInfo.phone ? shippingInfo.phone : "",
    country: shippingInfo.country ? shippingInfo.country : "",
  });

  const { city, address, pincode, phone, country } = shippingDetails;
  const onShippingInfoChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleShippingInfo = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingDetails));
    if (shippingInfo) {
      navigate("/order/confirm");
    }
  };

  return (
    <div className="shipping_container">
      <div className="form_div">
        <div className="heading">
          <h2> shipping </h2>
        </div>
        <form className="shipping_form" onSubmit={handleShippingInfo}>
          <input
            type="text"
            name="city"
            value={city}
            onChange={onShippingInfoChange}
            placeholder="Enter city"
          />
          <input
            type="text"
            placeholder="Enter address"
            name="address"
            value={address}
            onChange={onShippingInfoChange}
          />
          <input
            type="number"
            placeholder="Enter pincode"
            name="pincode"
            value={pincode}
            onChange={onShippingInfoChange}
          />
          <input
            type="text"
            placeholder="Enter country"
            name="country"
            value={country}
            onChange={onShippingInfoChange}
          />
          <input
            type="number"
            placeholder="Enter phone number"
            name="phone"
            value={phone}
            onChange={onShippingInfoChange}
          />
          <button> continue </button>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
