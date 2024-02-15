const addDecimals = (num) => {
  return (Math.floor(num * 100) / 100).toFixed(2);
};
export const updateCart = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  const shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  const taxPrice = 0.15 * state.itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
