import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './features/currency.slice';
import cartSlice from './features/cart.slice';

export const store = configureStore({
	reducer: {
		currency: currencySlice,
		cart: cartSlice,
	},
});
