import React from "react";
import products from "../products";
import Product from "../components/Product";

export default function HomeScreen() {
  return (
    <div className="my-3">
      <h4 className="mb-3 text-uppercase fw-light">Products</h4>
    <div className="row">
      {products.map((product) => (
          <div className="col-sm-12 col-md-4 col-lg-3">
          <Product product={product} />
        </div>
      ))}
      </div>
    </div>
  );
}
