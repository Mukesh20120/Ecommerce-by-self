import React from "react";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

export default function HomeScreen() {
  const { data, isLoading, error } = useGetProductsQuery();
  const products = data?.products || [];
  return (
    <>
      {isLoading ? (
        <>
          <p>loading...</p>
        </>
      ) : error ? (
        <>{error.message}</>
      ) : (
        <>
   
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
        </>
      )}
    </>
  );
}
