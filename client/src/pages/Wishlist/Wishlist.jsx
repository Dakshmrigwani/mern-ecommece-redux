import React, { useEffect } from "react";
import "./Wishlist.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteWishlist,
  userWishlist,
} from "../../redux/wishlist/wishlistSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const { wishitems, error } = useSelector((state) => ({ ...state.wishlist }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
      navigate("/");
    }
    dispatch(userWishlist());
  }, [dispatch, toast, error]);

  const deleteWishlistHandler = (id) => {
    dispatch(deleteWishlist({ id }));
  };

  return (
    <div className="wish_container">
      <div className="heading">
        <h1>Your Wishlist</h1>
      </div>

      <div className="grid_container">
        {wishitems?.length == 0 ? (
          <div className="alert_box">
            <h2 className="empty">Wishlist is Empty</h2>
          </div>
        ) : (
          <>
            {wishitems.map((item) => (
              <React.Fragment key={item._id}>
                <div className="box">
                  <div className="cat">
                    <h2> {item.product_category} </h2>
                  </div>

                  <div className="img_box">
                    <img src={item.product_image} alt="" />
                  </div>

                  <div className="info_box">
                    <h2> {item.product_name} </h2>
                    <div className="price"> ${item.product_price} </div>
                  </div>

                  <div className="flex-btns">
                    <div>
                      <ShoppingCartOutlinedIcon className="icon" />
                    </div>
                    <div onClick={() => deleteWishlistHandler(item._id)}>
                      <DeleteOutlineOutlinedIcon className="icon" />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
