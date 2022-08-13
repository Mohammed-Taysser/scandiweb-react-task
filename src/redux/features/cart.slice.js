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
	},
});

// Action creators are generated for each case reducer function
export const { addCartItem } = cartSlice.actions;

export default cartSlice.reducer;
