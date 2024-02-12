import React from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

export default function ProductScreen() {
  const { id: productId } = useParams();
  const { data, isLoading, error } = useGetProductDetailsQuery(productId);
  console.log(data);
  const productData = data || undefined;

  const product = {
    name: productData?.name || "",
    image: productData?.image || "/images/airpods.jpg",
    rating: productData?.rating || 0,
    numReviews: productData?.numReviews || 0,
    countInStock: productData?.countInStock || 0,
    price: productData?.price || 0,
  };

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
              <div className="mt-2">
                <button
                  className="btn btn-dark"
                  disabled={product.countInStock === 0}
                >
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
