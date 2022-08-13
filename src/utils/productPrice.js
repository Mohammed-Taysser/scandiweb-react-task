function productPrice(price = []) {
	const selectedPrice = price.find((value) => value.currency.label === 'USD');
	return selectedPrice.amount;
}

export default productPrice;
