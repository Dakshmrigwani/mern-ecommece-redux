import React, { useEffect, useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.scss";
import toast from "react-hot-toast";
import { clearError, createNewOrder } from "../../redux/order/orderSlice";
import { clearCart } from "../../redux/cart/cartSlice";

function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);

  const paymentData = {
    amount: Math.round(orderInfo.grand_total * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.sub_total,
    shippingPrice: orderInfo.shipping_charge,
    totalPrice: orderInfo.grand_total,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).user_token
              : ""
          }`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createNewOrder(order));

          navigate("/success");
          dispatch(clearCart());
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      console.log(error);
      payBtn.current.disabled = false;
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  return (
    <div className="payment_container">
      <div className="form_box">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="heading">
            <h2> Card info </h2>
          </div>
          <CardNumberElement className="box" />
          <CardExpiryElement className="box" />
          <CardCvcElement className="box" />
          <button type="submit" ref={payBtn} className="pay_now">
            Pay - {`${orderInfo.grand_total}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
