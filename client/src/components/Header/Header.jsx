import React, { useEffect } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.scss";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/user/userSlice";
import Img from "../../images/pic-3.png";
import { userWishlist } from "../../redux/wishlist/wishlistSlice";

function Header() {
  const [open, setOpen] = React.useState(false);
  const [profile, setProfile] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let cart = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  const { wishitems } = useSelector((state) => ({ ...state.wishlist }));
  // const { cartProducts } = useSelector((state) => ({ ...state.cart }));

  let wish = wishitems.length;

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    setProfile(!profile);
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      dispatch(userWishlist());
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="menu-circle" onClick={() => setOpen(!open)}>
          <RiMenu2Fill className="icon" />
        </div>
        <div className="flex-icons">
          <div className="menu-circle" onClick={() => setProfile(!profile)}>
            <PersonOutlineOutlinedIcon className="head_icons" />
          </div>
          <div className="menu-circle">
            <Link to="/wishlist">
              <FavoriteBorderIcon className="head_icons" />
              {wish > 0 && user && <span className="wish">{wish}</span>}
            </Link>
          </div>
          <div className="menu-circle">
            <Link to="/cart">
              <ShoppingBasketOutlinedIcon className="head_icons" />
              {cart.length > 0 && <span className="wish">{cart.length}</span>}
              {/* <span className="wish">
                {cartProducts.length > 0 ? cartProducts?.length : 0}
              </span> */}
            </Link>
          </div>
        </div>
      </div>

      <div className="profile_container">
        <div className={profile ? "profile active" : "profile"}>
          <div className="profile_img">
            <img src={user ? user?.image : Img} alt="" />
          </div>

          <div className="profile_info">
            <h3>{user ? user?.name : "Login please"}</h3>
            <div className="flex-btns">
              {user ? (
                <>
                  <Link to="/orders">
                    <button
                      className="order"
                      onClick={() => setProfile(!profile)}
                    >
                      orders
                    </button>
                  </Link>
                  <div className="upper-btns">
                    <Link to="/profile">
                      <button
                        className="btn"
                        onClick={() => setProfile(!profile)}
                      >
                        profile
                      </button>
                    </Link>
                    <button className="btn" onClick={handleLogout}>
                      logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      width: "100%",
                    }}
                  >
                    <div className="upper-btns">
                      <button
                        className="btn"
                        onClick={() => setProfile(!profile)}
                      >
                        login
                      </button>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={open ? "nav-container active" : "nav-container"}>
        <nav>
          <ul>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => setOpen(!open)}
            >
              <li>
                <HomeIcon className="icon" /> <span> home </span>
              </li>
            </Link>
            <Link
              to="/shop"
              style={{
                textDecoration: "none",
                color: "white",
              }}
              onClick={() => setOpen(!open)}
            >
              <li style={{ marginLeft: "2rem" }}>
                <StorefrontIcon className="icon" /> <span> shop </span>
              </li>
            </Link>
          </ul>
        </nav>
        <div className="close" onClick={() => setOpen(!open)}>
          <CloseIcon className="close-icon" />
        </div>
      </div>
    </>
  );
}

export default Header;
