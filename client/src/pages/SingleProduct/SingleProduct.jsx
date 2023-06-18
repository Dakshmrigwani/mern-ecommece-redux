import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/product/productSlice";
import { addToCart } from "../../redux/cart/cartSlice";
import { addToWishlist } from "../../redux/wishlist/wishlistSlice";

function SingleProduct() {
  const [quantity, setQuantity] = React.useState(1);
  const { id } = useParams();
  const { product, loading } = useSelector((state) => ({ ...state.products }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id]);

  const addWishlist = (e) => {
    e.preventDefault();
    dispatch(
      addToWishlist({
        product_name: product.name,
        product_price: product.price,
        product_category: product.category,
        product_image: product.image,
      })
    );
  };

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: quantity }));
  };

  return (
    <>
      {/* Loading */}
      {loading ? (
        <>
          <div className="product_container">
            <h2> Loading... </h2>
          </div>
        </>
      ) : (
        <>
          <div className="product_container">
            <div className="heading_box">
              <h2> {product.name} Details </h2>
              <div className="back-btn">
                <Link to="/shop">
                  <button>
                    <span> &#8592; </span> go Back
                  </button>
                </Link>
              </div>
            </div>

            {/* Single Product */}
            <div className="main_div">
              <div className="grid_container">
                <div className="left">
                  <div className="image">
                    <img src={product?.image && product?.image} alt="" />
                  </div>
                </div>
                <div className="right">
                  <div className="product_details">
                    <h2> {product.name} </h2>
                    <p>{product.desc}</p>

                    <div className="price">
                      <h3> $ {product.price} </h3>
                    </div>

                    <div className="stock">
                      <span> Availability: </span>
                      <span>
                        {product.inStock ? (
                          "in stock"
                        ) : (
                          <h4 style={{ color: "#DA5737" }}> out of stock </h4>
                        )}
                      </span>
                    </div>

                    <div className="quantity">
                      <span
                        onClick={() =>
                          setQuantity(quantity > 1 ? quantity - 1 : quantity)
                        }
                      >
                        -
                      </span>
                      <input
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <span onClick={() => setQuantity(quantity + 1)}>+</span>
                    </div>

                    <div className="flex-btns">
                      {product.inStock && (
                        <>
                          <button className="btn" onClick={addWishlist}>
                            Add to Wishlist
                          </button>
                          <button className="btn" onClick={handleCart}>
                            Add to Cart
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SingleProduct;
