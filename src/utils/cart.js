import { exchangePrice } from './exchange';
/**
 * calculate cart items length
 * @param {Object} cart cart items
 * @returns {Number} items length
 */
function calculateCartLength(cart = {}) {
	return Object.keys(cart).reduce(
		(prev, current) => prev + cart[current].quantity,
		0
	);
}

/**
 * calculate cart total fees
 * @param {Object} cart cart items
 * @param {Object} currency current currency
 * @returns {String} fees
 */
function cartTotalFees(cart = {}, currency = {}) {
	return Object.keys(cart)
		.reduce(
			(prev, current) =>
				prev +
				cart[current].quantity * exchangePrice(cart[current].prices, currency),
			0
		)
		.toFixed(2);
}

export { calculateCartLength, cartTotalFees };
