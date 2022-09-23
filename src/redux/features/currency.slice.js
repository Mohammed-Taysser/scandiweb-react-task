import { createSlice } from '@reduxjs/toolkit';
import { CURRENCY } from '../../constants/currency';

const CURRENCY_LOCAL_STORAGE = process.env.REACT_APP_LOCAL_STORAGE_CURRENCY_TITLE;

export const currencySlice = createSlice({
	name: 'currency',
	initialState: {
		value:
			JSON.parse(localStorage.getItem(CURRENCY_LOCAL_STORAGE)) || CURRENCY[0],
	},
	reducers: {
		changeCurrency: (state, action) => {
			state.value = action.payload;
			localStorage.setItem(
				CURRENCY_LOCAL_STORAGE,
				JSON.stringify(action.payload)
			);
		},
		// initCurrency: (state) => {
		// 	try {
		// 		const currency = JSON.parse(localStorage.getItem('currency'));
		// 		state.value = currency;
		// 	} catch (error) {
		// 		state.value = CURRENCY[0];
		// 		console.log(error);
		// 	}
		// },
	},
});

export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;
