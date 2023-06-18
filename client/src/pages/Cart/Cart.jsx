import React, { useEffect } from "react";
import "./Cart.scss";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  clearCart,
  decreaseQuantity,
  removeCartItem,
} from "../../redux/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Cart() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  const { _id } = user;

  const { cartItems, cartError } = useSelector((state) => ({
    ...state.cart,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) cartError && toast.error(cartError);
  }, [user, cartError]);

  // useEffect(() => {
  //   if (user && user.name) {
  //     dispatch(userCartList());
  //   }
  // }, [dispatch]);

  function totalPrice() {
    let x = 0;
    // eslint-disable-next-line
    cartItems.map((totalP) => {
      x += totalP.price * totalP.qty;
    });
    return x;
  }

  const increaseQty = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseQty = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const removeItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="main_container">
      <div className="heading">
        <h2> Your Cart </h2>
        {cartItems.length == 0 && (
          <>
            <div className="alert_box">
              <h2 className="empty"> Cart is Empty Now </h2>
            </div>
          </>
        )}
      </div>

      <div className="flex_container">
        <div className="left">
          <table>
            <thead>
              <tr className="table-row">
                <th>Product</th>
                <th>Name</th>
                <th className="price-heading">Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <>
              <tbody className="product_info">
                {cartItems.length > 0 && (
                  <>
                    {cartItems?.map((item) => (
                      <React.Fragment key={item._id}>
                        <tr>
                          <td>
                            <div className="img_div">
                              <img src={item.image} alt="" />
                            </div>
                          </td>
                          <td className="name">{item.name}</td>
                          <td className="price">${item.price}.00</td>
                          <td>
                            <div className="qty_div">
                              <span
                                className="inc-dec"
                                onClick={() => decreaseQty(item._id)}
                              >
                                -
                              </span>
                              <h3>{item.qty}</h3>
                              <span
                                className="inc-dec"
                                onClick={() => increaseQty(item._id)}
                              >
                                +
                              </span>
                            </div>
                          </td>
                          <td>
                            <div
                              className="remove_item"
                              onClick={() => removeItem(item._id)}
                            >
                              <HighlightOffOutlinedIcon className="icon" />
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </tbody>
            </>

            {/* cart api */}

            {/* {user && (
              <>
                <tbody className="product_info">
                  {cartProducts?.length > 0 &&
                    cartProducts?.map((item) => (
                      <React.Fragment key={item._id}>
                        <tr>
                          <td>
                            <div className="img_div">
                              <img src={item.product_image} alt="" />
                            </div>
                          </td>
                          <td className="name">{item.product_name}</td>
                          <td className="price">${item.product_price}.00</td>
                          <td>
                            <div className="qty_div">
                              <span
                                className="inc-dec"
                                onClick={() => decreaseQty(item._id)}
                              >
                                -
                              </span>
                              <h3>{item.product_quantity}</h3>
                              <span
                                className="inc-dec"
                                onClick={() => increaseQty(item._id)}
                              >
                                +
                              </span>
                            </div>
                          </td>
                          <td>
                            <div
                              className="remove_item"
                              onClick={() =>
                                removeApiCart(item._id, item.product_id)
                              }
                            >
                              <HighlightOffOutlinedIcon className="icon" />
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                </tbody>
              </>
            )} */}
          </table>

          <div className="go-back">
            {cartItems.length > 0 ? (
              <>
                <Link to="/shop">
                  <button>Continue Shopping</button>
                </Link>
                <button onClick={() => dispatch(clearCart())}>
                  Clear Cart
                </button>
              </>
            ) : (
              <>
                <Link to="/shop">
                  <button>Add Items</button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="right">
          <div className="heading">
            <h1> Cart Totals </h1>
          </div>

          <div className="sub-total">
            <h2>Sub Total:</h2>
            <h2>${totalPrice().toLocaleString()}.00</h2>
          </div>

          <div className="shipping">
            <h3 className="text-xl">Shipping:</h3>
            <h3>Free</h3>
          </div>

          <div className="total">
            <h2 className="text-xl">Total:</h2>
            <h2>${totalPrice().toLocaleString()}.00</h2>
          </div>

          <div className="check-out">
            <button onClick={checkoutHandler}>check out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
