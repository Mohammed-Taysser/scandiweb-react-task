import { exchangePrice } from './exchange';
import { refactorProductAttribute } from './products';
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

/**
 * detect if the given product with attributes is in cart or not
 * @param {String} productId product id to be searched for
 * @param {Array} cart cart items 
 * @param {Array | Object} attributes product attributes to be searched
 * @returns {Boolean} product in cart or not
 */
function isInCart(productId = '', cart = [], attributes = []) {
	const refactoredAttribute = refactorProductAttribute(attributes);

	/**
	 * detect if the given product has the same selected attribute or not 
	 * (selected attribute come from cart item)
	 * @param {Object} product product
	 * @returns {Boolean} has the same selected attribute or not
	 */
	const hasSameAttribute = (product) => {
		return Object.keys(product.attributes).every(
			(key) =>
				product.attributes[key].selected === refactoredAttribute[key]?.selected
		);
	};

	return cart.find(
		(product) => product.id === productId && hasSameAttribute(product)
	);
}

export { calculateCartLength, cartTotalFees, isInCart };
