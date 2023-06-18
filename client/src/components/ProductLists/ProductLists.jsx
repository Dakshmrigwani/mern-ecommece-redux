import React, { useEffect, useState } from "react";
import "./ProductList.scss";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, searchProduct } from "../../redux/product/productSlice";
import axios from "axios";
import { addToWishlist } from "../../redux/wishlist/wishlistSlice";
import { addToCart } from "../../redux/cart/cartSlice";
import { toast } from "react-hot-toast";

function ProductLists() {
  const { products } = useSelector((state) => ({ ...state.products }));
  const { error } = useSelector((state) => ({ ...state.wishlist }));
  const [quantity, setQuantity] = useState(1);
  const [list, setList] = React.useState(products);
  const [search, setSearch] = React.useState("");
  const [categories, setCategories] = React.useState();
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [priceRange, setPriceRange] = React.useState();
  const [price, setPrice] = React.useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let priceArr = products.map((item) => item.price);
  let maxPrice = Math.max(...priceArr);

  useEffect(() => {
    if (maxPrice) {
      setPrice(maxPrice);
    }
  }, [maxPrice]);

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search) {
      dispatch(searchProduct(search));
      navigate(`/shop/search?searchQuery=${search}`);
    } else {
      navigate("/shop");
    }
  };

  // get categorys
  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        "https://api-mern-ecommece.vercel.app/api/categories/"
      );
      setCategories(response.data.categories);
    };
    getCategories();
  }, []);

  const filterCategory = (cat_name) => {
    setSelectedCategory(cat_name);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
    setPriceRange(e.target.value);

    let priceRangeValue = e.target.value;

    let priceFilter = products;

    if (priceRangeValue) {
      priceFilter = products.filter((item) => item.price <= priceRangeValue);
      setList(priceFilter);
    }
  };

  useEffect(() => {
    const applIFilters = () => {
      let productLists = products;

      if (selectedCategory) {
        productLists = productLists.filter(
          (item) => item.category === selectedCategory
        );
        setList(productLists);
      } else {
        setList(products);
      }
    };
    applIFilters();
  }, [products, selectedCategory]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, toast]);

  const addWishlist = (product) => {
    dispatch(
      addToWishlist({
        product_name: product.name,
        product_price: product.price,
        product_category: product.category,
        product_image: product.image,
      })
    );
  };

  // add to cart handler
  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, product_id: product._id, qty: quantity }));
  };

  return (
    <div className="products_lists">
      <div className="main_container">
        <div className="heading">
          <h2> All Products </h2>
        </div>

        <div className="grid_container">
          <div className="left">
            <div className="search_box">
              <h3> Filter by Search </h3>
              <form className="input_box" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>

            <div className="category_box">
              <h3> Filter by Category </h3>
              <div className="cat">
                <span onClick={() => filterCategory()}> All </span>
                {categories &&
                  categories.map((cat) => (
                    <span
                      key={cat._id}
                      onClick={() => filterCategory(cat.name)}
                    >
                      {cat.name}
                    </span>
                  ))}
              </div>
            </div>

            <div className="price_box">
              <h3> Filter by Price </h3>

              <h2> ${price} </h2>
              <input
                type="range"
                min={1}
                value={priceRange}
                max={maxPrice}
                onChange={handlePrice}
              />
            </div>
          </div>
          <div className="right">
            {list?.length == 0 ? (
              <h2 className="not_found"> No Products Found </h2>
            ) : (
              <>
                {list.map((product) => (
                  <React.Fragment key={product._id}>
                    <div className="box">
                      <div className="cat">
                        <h2> {product.category} </h2>
                      </div>

                      <div className="img_box">
                        <img
                          src={
                            product?.image
                              ? product?.image
                              : "Image Not availabe"
                          }
                          alt=""
                        />
                      </div>

                      <div className="info_box">
                        <h2> {product.name} </h2>
                        <div className="price"> ${product.price} </div>
                      </div>

                      <div className="flex-btns">
                        <div>
                          <Link to={`/product/${product._id}`}>
                            <VisibilityOutlinedIcon className="icon" />
                          </Link>
                        </div>
                        <div onClick={() => addWishlist(product)}>
                          <FavoriteBorderOutlinedIcon className="icon" />
                        </div>
                        <div onClick={() => addToCartHandler(product)}>
                          <ShoppingCartOutlinedIcon className="icon" />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductLists;
