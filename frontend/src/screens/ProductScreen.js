import React from "react";
import { Link, useParams } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";
import { GiSightDisabled } from "react-icons/gi";

export default function ProductScreen() {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  return (
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
              disabled={product.countInStock===0}
            >
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
