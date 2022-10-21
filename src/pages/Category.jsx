import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { exchangePrice } from '../utils/exchange';
import { addCartItem, removeCartItem } from '../redux/features/cart.slice';
import { categoryProductHOC } from '../HOC/apollo';
import withParamsHOC from '../HOC/withParams';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import cartIcon from '../assets/images/icons/cart-white.svg';
import { generateProductId, refactorProductAttribute } from '../utils/products';

class Category extends Component {
	constructor(props) {
		super(props);

		this.AddToCartButton = this.AddToCartButton.bind(this);
		this.ProductList = this.ProductList.bind(this);
		this.onAddToCartClick = this.onAddToCartClick.bind(this);
	}

	onAddToCartClick(product) {
		const item = {};

		item['id'] = product.id;
		item['productId'] = product.productId;
		item['name'] = product.name;
		item['brand'] = product.brand;
		item['attributes'] = product.attributes;
		item['prices'] = product.prices;
		item['gallery'] = product.gallery;
		item['quantity'] = 1;
		this.props.addCartItem(item);
	}

	AddToCartButton(props) {
		const { product } = props;

		const refactoredAttributes = refactorProductAttribute(product.attributes);

		const productId = generateProductId({
			...product,
			attributes: refactoredAttributes,
		});

		return (
			<button
				className={`add-to-cart ${
					this.props.cart.items[productId] ? 'added' : ''
				}`}
				onClick={
					this.props.cart.items[productId]
						? () => this.props.removeCartItem(productId)
						: () =>
								this.onAddToCartClick({
									...product,
									productId,
									attributes: refactoredAttributes,
								})
				}
			>
				<img src={cartIcon} alt='cart icon' />
			</button>
		);
	}

	ProductList() {
		const { loading, error, data } = this.props.query;

		if (loading) {
			return <Spinner />;
		} else if (error) {
			return <Alert>{error.message}</Alert>;
		} else if (data?.category) {
			const { products } = data.category;
			return (
				<>
					{products.map((product) => (
						<div
							className={`single-product ${product.inStock ? '' : 'out-stock'}`}
							key={product.id}
						>
							<div className='product-image-wrapper'>
								<img
									src={product.gallery[0]}
									className='product-image'
									alt={product.name}
								/>
								{product.inStock && <this.AddToCartButton product={product} />}
							</div>
							<div className='product-info-wrapper'>
								<Link to={`/product/${product.id}`} className='product-title'>
									{product.name} {product.brand}
								</Link>
								<div className='product-price'>
									{this.props.currency.symbol}{' '}
									{exchangePrice(product.prices, this.props.currency)}
								</div>
							</div>
						</div>
					))}
				</>
			);
		} else {
			return <Alert>no category found</Alert>;
		}
	}

	render() {
		return (
			<div className='category-page'>
				<div className='container'>
					<h1 className='display-5'>{this.props.params.title || 'all'}</h1>
					<div className='category-wrapper'>
						<this.ProductList />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { currency: state.currency.value, cart: state.cart };
}

function mapDispatchToProps(dispatch) {
	return {
		addCartItem: (item) => dispatch(addCartItem(item)),
		removeCartItem: (item) => dispatch(removeCartItem(item)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withParamsHOC(categoryProductHOC(Category)));
