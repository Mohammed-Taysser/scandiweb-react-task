import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { exchangePrice } from '../utils/exchange';
import { productDetailsHOC } from '../HOC/apollo';
import { addCartItem } from '../redux/features/cart.slice';
import { generateProductId } from '../utils/products';
import withParamsHOC from '../HOC/withParams';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import ProductAttribute from '../components/ProductAttribute';

class ProductDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imagePreview: '',
			attributes: {},
		};

		this.onAddToCartClick = this.onAddToCartClick.bind(this);
		this.AddToCartButton = this.AddToCartButton.bind(this);
		this.RenderProductDetails = this.RenderProductDetails.bind(this);
	}

	onAddToCartClick(product) {
		const item = {};
		item['id'] = product.id;
		item['name'] = product.name;
		item['brand'] = product.brand;
		item['attributes'] = this.state.attributes;
		item['prices'] = product.prices;
		item['gallery'] = product.gallery;
		item['quantity'] = 1;
		this.props.addCartItem(item);
	}

	AddToCartButton(props) {
		const { product } = props;

		if (!product.inStock) {
			return <Alert>out of stock</Alert>;
		}

		const productId = generateProductId({
			...product,
			attributes: this.state.attributes,
		});

		if (this.props.cart[productId]) {
			return (
				<Alert>
					item with these attributes already in cart{' '}
					<Link to='/cart' className=''>
						View Bag
					</Link>
				</Alert>
			);
		}

		return (
			<button
				className='btn-aurora btn-cart'
				onClick={() => this.onAddToCartClick(product)}
			>
				ADD TO CART
			</button>
		);
	}

	RenderProductDetails() {
		const { loading, error, data } = this.props.query;
		if (loading) {
			return <Spinner center />;
		} else if (error) {
			return <Alert>{error.message}</Alert>;
		} else if (data?.product) {
			const { product } = data;
			return (
				<div className='product-details'>
					<div className='product-image'>
						<div className='gallery'>
							{product.gallery.map((image, index) => (
								<img
									src={image}
									alt={product.name}
									key={index}
									onClick={() => {
										this.setState({ imagePreview: image });
									}}
								/>
							))}
						</div>
						<div className='image'>
							<img
								src={this.state.imagePreview || product.gallery[0]}
								alt={product.name}
							/>
						</div>
					</div>
					<div className='item-info'>
						<h3 className='item-title'>{product.name}</h3>
						<h5 className='item-brand'>{product.brand}</h5>

						<ProductAttribute
							onChange={(attributes) => this.setState({ attributes })}
							attributes={product.attributes}
						/>

						<div className='item-price'>
							<p className='item-attribute-label'>price:</p>
							<span className='item-currency-symbol'>
								{this.props.currency.symbol}
							</span>{' '}
							<span className='item-currency-value'>
								{exchangePrice(product.prices, this.props.currency)}
							</span>
						</div>
						<this.AddToCartButton product={product} />
						<div className='product-description'>
							{parse(product.description)}
						</div>
					</div>
				</div>
			);
		} else {
			return <Alert>no product found</Alert>;
		}
	}
	render() {
		return (
			<div className='product-details-page'>
				<div className='container'>
					<this.RenderProductDetails />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { currency: state.currency.value, cart: state.cart.items };
}

function mapDispatchToProps(dispatch) {
	return {
		addCartItem: (item) => dispatch(addCartItem(item)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withParamsHOC(productDetailsHOC(ProductDetails)));
