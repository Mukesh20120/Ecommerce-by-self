import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

export default function ProductScreen() {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const { data, isLoading, error } = useGetProductDetailsQuery(productId);
  console.log(data);
  const productData = data || undefined;
  const [qty, setQty] = useState(1);
  const product = {
    name: productData?.name || "",
    image: productData?.image || "/images/airpods.jpg",
    rating: productData?.rating || 0,
    numReviews: productData?.numReviews || 0,
    countInStock: productData?.countInStock || 0,
    price: productData?.price || 0,
  };

  const handleAddToCart = () => {
    const item = {...productData,qty};
    dispatch(addToCart({item}));
  }

  return (
    <>
      {isLoading ? (
        <>
          <p>loading...</p>
        </>
      ) : error ? (
        <>
          <p>{error.message}</p>{" "}
        </>
      ) : (
        <>
          <Link to={"/"}>
            <p className="btn btn-dark text-uppercase ">go back</p>
          </Link>
          <div className="row">
            <div className="col-5">
              <img
                src={require(`../components${product.image}`)}
                style={{ height: "100%", width: "100%" }}
                alt="product"
              />
            </div>
            <div className="col-4">
              <h3 className="my-3">{product.name}</h3>
              <div className="py-4">
                <Rating rating={product.rating} text={product.numReviews} />
              </div>
              <h4 className="my-3">Price ${product.price}</h4>
            </div>
            <div className="col-3 ">
              <div className="d-flex gap-3">
                <span>Price :</span>
                <strong>${product.price}</strong>
              </div>
              <div className="d-flex gap-3">
                <span>In Stock :</span>
                <strong>
                  {product.countInStock === 0 ? "Out Stock" : "In Stock"}
                </strong>
              </div>
              <div className="mt-2 d-flex flex-row gap-2 align-items-center ">
                <button
                  className="btn btn-dark flex-1"
                  disabled={product.countInStock === 0}
                  onClick={handleAddToCart}
                >
                  Add Cart
                </button>
                <div className="flex-1">
                  <select
                    name="qty"
                    defaultValue={1}
                    onChange={(e) => {setQty(Number(e.target.value));
                    console.log(qty)}}
                  >
                    {[...Array(product.countInStock).keys()].map((i) => (
                      <option value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
