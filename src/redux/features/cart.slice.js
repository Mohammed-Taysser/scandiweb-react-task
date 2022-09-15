import { createSlice } from '@reduxjs/toolkit';
import { generateProductId } from '../../utils/products';
import { calculateCartLength } from '../../utils/cart';

const STORED_CART = JSON.parse(localStorage.getItem('cart')) || {};

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: STORED_CART,
		length: calculateCartLength(STORED_CART),
	},
	reducers: {
		addCartItem: (state, action) => {
			const productId = generateProductId(action.payload);
			if (!state.items[productId]) {
				state.items[productId] = { ...action.payload, productId };
				state.length = calculateCartLength(state.items);
				localStorage.setItem('cart', JSON.stringify(state.items));
			}
		},
		removeCartItem: (state, action) => {
			if (state.items[action.payload]) {
				delete state.items[action.payload];
				localStorage.setItem('cart', JSON.stringify(state.items));
				state.length = calculateCartLength(state.items);
			}
		},
		updateCartItem: (state, action) => {
			if (state.items[action.payload.productId]) {
				state.items[action.payload.productId] = {
					...state.items[action.payload.productId],
					...action.payload.product,
				};
			}
			state.length = calculateCartLength(state.items);
			localStorage.setItem('cart', JSON.stringify(state.items));
		},
	},
});

// Action creators are generated for each case reducer function
export const { addCartItem, updateCartItem, removeCartItem } =
	cartSlice.actions;

export default cartSlice.reducer;
