import { createSlice } from '@reduxjs/toolkit';
import { calculateCartLength } from '../../utils/cart';

const STORED_CART = JSON.parse(localStorage.getItem('cart')) || [];

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: STORED_CART,
		length: calculateCartLength(STORED_CART),
	},
	reducers: {
		addCartItem: (state, action) => {
			state.items.push(action.payload);
			localStorage.setItem('cart', JSON.stringify(state.items));
			state.length = calculateCartLength(state.items);
		},
		removeCartItem: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			localStorage.setItem('cart', JSON.stringify(state.items));
			state.length = calculateCartLength(state.items);
		},
		updateCartItem: (state, action) => {
			const updatedCartItems = state.items.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, ...action.payload.item };
				}
				return item;
			});
			state.items = updatedCartItems;
			state.length = calculateCartLength(updatedCartItems);
			localStorage.setItem('cart', JSON.stringify(updatedCartItems));
		},
	},
});

// Action creators are generated for each case reducer function
export const { addCartItem, updateCartItem, removeCartItem } =
	cartSlice.actions;

export default cartSlice.reducer;
