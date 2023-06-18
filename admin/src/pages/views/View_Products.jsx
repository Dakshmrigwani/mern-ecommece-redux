import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../redux/product/productSlice";

function View_Products() {
  const { products } = useSelector((state) => ({
    ...state.prodReducer,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    //check for if exists user then redirect from login to home page
    if (!localStorage.getItem("admin")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleDeleteProd = (id) => {
    dispatch(deleteProduct({ id }));
  };

  return (
    <>
      <div className="px-4 mt-5 flex items-center justify-between">
        <h2 className="text-lg shadow-md py-2 px-4 inline-block bg-red-500 text-white">
          All Products
        </h2>
        <Link
          to="/add_product"
          className="text-lg shadow-md py-2 px-4 inline-block bg-green-500 text-white"
        >
          Add Product
        </Link>
      </div>
      <div className="mt-4 px-4 w-full">
        {products.length == 0 ? (
          <h2 className="text-2xl p-3 bg-white text-green-500 border border-green-400 w-[40%] text-center mx-auto">
            No Products Found !
          </h2>
        ) : (
          <table className="w-full h-full capitalize">
            <thead className="bg-slate-200">
              <tr className="">
                <th className="border border-r-slate-400 border-b-slate-400">
                  id
                </th>
                <th className="border border-r-slate-400 border-b-slate-400">
                  product name
                </th>
                <th className="border border-r-slate-400 border-b-slate-400">
                  product image
                </th>
                <th className="border border-r-slate-400 border-b-slate-400">
                  product category
                </th>
                <th className="border border-r-slate-400 border-b-slate-400">
                  product price
                </th>
                <th className="border border-r-slate-400 border-b-slate-400">
                  product stock
                </th>
                <th className="border border-b-slate-400">actions</th>
              </tr>
            </thead>
            <tbody className="text-center leading-9">
              {products.map((product) => (
                <Fragment key={product._id}>
                  <tr key={product._id}>
                    <td className="border border-r-slate-400 border-b-slate-400">
                      {product._id}
                    </td>
                    <td className="border border-r-slate-400 border-b-slate-400">
                      {product.name}
                    </td>
                    <td className="border border-r-slate-400 border-b-slate-400 p-3">
                      <img
                        src={product.image}
                        alt="/"
                        className="w-24 h-20 object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-r-slate-400 border-b-slate-400">
                      {product.category}
                    </td>
                    <td className="border border-r-slate-400 border-b-slate-400">
                      ${product.price}
                    </td>
                    {product.inStock == true ? (
                      <>
                        <td className="border border-r-slate-400 border-b-slate-400 text-green-500">
                          In Stock
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border border-r-slate-400 border-b-slate-400 text-red-500">
                          Out Stock
                        </td>
                      </>
                    )}
                    <td className="border border-b-slate-400 flex items-center justify-center h-full">
                      <PencilIcon
                        width={20}
                        className="mx-auto cursor-pointer text-green-500"
                      />
                      <TrashIcon
                        width={20}
                        onClick={() => handleDeleteProd(product._id)}
                        className="mx-auto cursor-pointer text-red-500"
                      />
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default View_Products;
