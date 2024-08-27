import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        body: data,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: (orderId, details) => ({
        url: `${ORDER_URL}/${orderId}`,
        method: "PUT",
        body: details,
      }),
    }),
    getPaypalId: builder.query({
      query: () => ({
        url: `${ORDER_URL}/`,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetPaypalIdQuery,
  usePayOrderMutation,
  useGetOrdersQuery,
} = orderApiSlice;
