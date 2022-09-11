import { exchangePrice } from './exchange';
/**
 * calculate cart items length
 * @param {Array} cart cart items
 * @returns {Number} items length
 */
function calculateCartLength(cart = []) {
	return cart.reduce((prev, current) => prev + current.quantity, 0);
}

/**
 * calculate cart total fees
 * @param {Array} cart cart items
 * @param {Object} currency current currency
 * @returns {Number} fees
 */
function cartTotalFees(cart = [], currency = {}) {
	return cart
		.reduce(
			(prev, current) =>
				prev + current.quantity * exchangePrice(current.prices, currency),
			0
		)
		.toFixed(2);
}

export { calculateCartLength, cartTotalFees };
