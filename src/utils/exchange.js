import { TAX } from '../constants/currency';

/**
 * exchange product pricy by currency, if not exist take first available price
 * @param {Array} prices array of product prices
 * @param {Object} currency current currency
 * @returns {Number} the exchanged product price
 */
function exchangePrice(prices = [], currency = {}) {
	const selectedPrice =
		prices.find((value) => value.currency.label === currency.label) ||
		prices[0];
	return selectedPrice.amount;
}

/**
 * exchange tax due to current currency
 * @param {Object} currency current currency
 * @returns {Number} the exchanged tax
 */
function exchangeTax(currency = {}) {
	const selectedTax = TAX.find((tax) => tax.label === currency.label);
	return selectedTax.amount;
}

export { exchangePrice, exchangeTax };
