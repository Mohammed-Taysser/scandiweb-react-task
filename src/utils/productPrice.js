function useProductPrice(price=[]) {
	const selectedPrice = price.find((value) => value.currency.label === 'USD');
	return selectedPrice.amount;
}

export default useProductPrice;
