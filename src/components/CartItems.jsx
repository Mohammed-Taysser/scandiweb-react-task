import React, { Component } from 'react';
import CART from '../constants/cart';
import {
	CapacityAttribute,
	ColorAttribute,
	SizeAttribute,
} from '../utils/productAttribute';
import Carousel from './Carousel';

class CartItems extends Component {
	state = {
		quantity: {},
	};
	getPriceByCurrency = (price) => {
		const selectedPrice = price.find((value) => value.currency.label === 'USD');
		return selectedPrice.amount;
	};

	incrementQuantity = (id) => {
		this.setState((st) => ({
			quantity: { ...st.quantity, [id]: (st.quantity[id] || 0) + 1 },
		}));
	};

	decrementQuantity = (id) => {
		this.setState((st) => ({
			quantity: { ...st.quantity, [id]: (st.quantity[id] || 0) - 1 },
		}));
	};

	render() {
		return (
			<div className='cart-items-wrapper'>
				{CART.map((item) => (
					<div
						className={`single-cart-item ${
							this.props.withBorder ? 'with-border' : ''
						}`}
						key={item.id}
					>
						<div className='item-info'>
							<h3 className='item-title'>{item.name}</h3>
							<h5 className='item-brand'>{item.brand}</h5>
							<p className='item-price'>
								<span className='item-currency-symbol'>$</span>
								<span className='item-currency-value'>
									{this.getPriceByCurrency(item.prices)}
								</span>
							</p>
							<SizeAttribute item={item} />
							<ColorAttribute item={item} />
							<CapacityAttribute item={item} />
						</div>
						<div className='item-gallery'>
							<div className='item-quantity'>
								<div
									className='item-quantity-plus'
									onClick={() => this.incrementQuantity(item.id)}
								>
									+
								</div>
								<div className='item-quantity-value'>
									{this.state.quantity[item.id] || 0}
								</div>
								<div
									className='item-quantity-minus'
									onClick={() => this.decrementQuantity(item.id)}
								>
									-
								</div>
							</div>
							<Carousel
								gallery={item.gallery}
								withSlider={this.props.withSlider}
							/>
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default CartItems;
