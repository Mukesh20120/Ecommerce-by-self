import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img
          src={require("." + product.image)}
          className="card-img-top"
          alt="product"
        />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <h5
            className="card-title text-dark"
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {product.name}
          </h5>
        </Link>
        <div>
          <Rating rating={product.rating} text={product.numReviews} />
          <p className="card-text fw-bolder fs-4">₹ {product.price}</p>
        </div>
      </div>
    </div>
  );
}
