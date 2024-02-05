import React from "react";
import products from "../products";
import Product from "../components/Product";

export default function HomeScreen() {
  return (
    <div className="my-3">
      <h4 className="mb-3 text-uppercase fw-light">Latest Product</h4>
    <div className="row row-gap-4">
      {products.map((product) => (
          <div className="col-sm-12 col-md-4 col-lg-3">
          <Product product={product} />
        </div>
      ))}
      </div>
    </div>
  );
}
