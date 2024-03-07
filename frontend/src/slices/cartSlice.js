import {createSlice} from "@reduxjs/toolkit"
import { updateCart } from "../utils/updateCart";

const initialState = localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):{cartItems: [],shippingAddress: {}}


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
        return updateCart(state);
        },
        removeFromCart: (state,action) => {
            const {id} = action.payload;
            state.cartItems = state.cartItems.filter((item)=>item._id!==id);
        return updateCart(state);
        },
        addShippingAddress: (state,action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        }
    }
})
export const {addToCart,removeFromCart,addShippingAddress} = cartSlice.actions;
export default cartSlice.reducer;