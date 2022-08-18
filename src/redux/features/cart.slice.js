import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: JSON.parse(localStorage.getItem('cart')) || [],
	},
	reducers: {
		addCartItem: (state, action) => {
			state.items.push(action.payload);
			localStorage.setItem('cart', JSON.stringify(state.items));
		},
		updateCartItem: (state, action) => {
			const updatedCartItems = state.items.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, ...action.payload.item };
				}
				return item;
			});
			state.items = updatedCartItems;
			localStorage.setItem('cart', JSON.stringify(updatedCartItems));
		},
	},
});

// Action creators are generated for each case reducer function
export const { addCartItem, updateCartItem } = cartSlice.actions;

export default cartSlice.reducer;
