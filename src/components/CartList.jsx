import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCartItem } from '../redux/features/cart.slice';
import { exchangePrice } from '../utils/exchange';
import Carousel from './Carousel';
import ProductAttributes from './ProductAttribute';

class CartList extends Component {
	constructor(props) {
		super(props);

		this.Quantity = this.Quantity.bind(this);
	}

	Quantity(props) {
		const { quantity, productId } = props;

		return (
			<div className='item-quantity'>
				<div
					className='item-quantity-plus'
					onClick={() =>
						this.props.onQuantityChange({
							id: productId,
							item: { quantity: quantity + 1 },
						})
					}
				>
					+
				</div>
				<div className='item-quantity-value'>{quantity}</div>
				<div
					className='item-quantity-minus'
					onClick={() =>
						this.props.onQuantityChange({
							id: productId,
							item: {
								quantity: quantity > 1 ? quantity - 1 : 1,
							},
						})
					}
				>
					-
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className='cart-items-wrapper'>
				{this.props.cart.map((product, index) => (
					<div
						className={`single-cart-item ${
							this.props.withBorder ? 'with-border' : ''
						}`}
						key={index}
					>
						<div className='item-info'>
							<Link to={`/product/${product.id}`} className='item-title'>
								{product.name}
							</Link>
							<h5 className='item-brand'>{product.brand}</h5>
							<p className='item-price'>
								<span className='item-currency-symbol'>
									{this.props.currency.symbol}
								</span>{' '}
								<span className='item-currency-value'>
									{exchangePrice(product.prices, this.props.currency)}
								</span>
							</p>
							<ProductAttributes attributes={product.attributes} />
							{this.props.removable && (
								<button
									className='btn-aurora btn-remove-from-cart'
									onClick={() => this.props.removeCartItem(product.id)}
								>
									Remove From Cart
								</button>
							)}
						</div>
						<div className='item-gallery'>
							<this.Quantity
								quantity={product.quantity}
								productId={product.id}
							/>
							<Carousel
								gallery={product.gallery}
								withSlider={this.props.withSlider}
							/>
						</div>
					</div>
				))}
			</div>
		);
	}
}

CartList.defaultProps = {
	onQuantityChange: () => {},
	withSlider: false,
	withBorder: false,
	removable: false,
	cart: [],
};

function mapStateToProps(state) {
	return { currency: state.currency.value };
}

function mapDispatchToProps(dispatch) {
	return {
		removeCartItem: (item) => dispatch(removeCartItem(item)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
