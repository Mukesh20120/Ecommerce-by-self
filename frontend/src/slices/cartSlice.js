import {createSlice} from "@reduxjs/toolkit"

const initialState = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):{cartItems: []}

const addDecimals = (num) =>{
    return (Math.floor(num*100)/100).toFixed(2);
}

const cartSlice = createSlice({
    initialState,
    name: 'cart',
    reducers: {
        addToCart: (state,action) => {
            const {item} = action.payload;
            const existingItem = state.cartItems.find((x)=>x._id===item._id);
            if(existingItem){
             state.cartItems = state.cartItems.map((x)=>x._id===item._id?item:x);
            }else{
                state.cartItems = [...state.cartItems,item];
            }
             const itemsPrice = state.cartItems.reduce((acc,item)=>acc+ item.price*item.qty,0);
             state.itemsPrice = addDecimals(itemsPrice);

             const shippingPrice = state.itemsPrice > 100 ? 0: 10;
             state.shippingPrice = addDecimals(shippingPrice);

             const taxPrice = 0.15 * state.itemsPrice;
             state.taxPrice = addDecimals(taxPrice);

             const totalPrice = itemsPrice + shippingPrice + taxPrice;
             state.totalPrice = addDecimals(totalPrice);

             localStorage.setItem('cart',JSON.stringify(state));
        }
    }
})
export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;