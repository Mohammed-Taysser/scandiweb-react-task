import React, { Component } from 'react';
import CART from '../constants/cart';
import Carousel from './Carousel';

class CartItems extends Component {
	state = {
		quantity: {},
	};
	getPriceByCurrency = (price) => {
		const selectedPrice = price.find((value) => value.currency.label === 'USD');
		return selectedPrice.amount;
	};

	getColorAttribute = ({ item }) => {
		const colors = item.attributes.find((attr) => attr.id === 'Color');

		return colors ? (
			<div className='item-colors'>
				<p className='item-attribute-label'>colors:</p>
				<div className='item-color-list'>
					{colors.items.map((color) => (
						<div
							key={color.id}
							className={`single-color ${
								item?.selectedColor?.id === color.id ? 'selected' : ''
							}`}
							style={{ backgroundColor: color.value }}
						></div>
					))}
				</div>
			</div>
		) : (
			<></>
		);
	};

	getSizeAttribute = ({ item }) => {
		const sizes = item.attributes.find((attr) => attr.id === 'Size');

		return sizes ? (
			<div className='item-sizes'>
				<p className='item-attribute-label'>sizes:</p>
				<div className='item-sizes-list'>
					{sizes.items.map((size) => (
						<div
							key={size.id}
							className={`single-size ${
								item?.selectedSize?.id === size.id ? 'selected' : ''
							}`}
						>
							{size.value}
						</div>
					))}
				</div>
			</div>
		) : (
			<></>
		);
	};

	getCapacityAttribute = ({ item }) => {
		const capacities = item.attributes.find((attr) => attr.id === 'Capacity');

		return capacities ? (
			<div className='item-capacity'>
				<p className='item-attribute-label'>capacity:</p>
				<div className='item-capacity-list'>
					{capacities.items.map((capacity) => (
						<div
							key={capacity.id}
							className={`single-capacity ${
								item?.selectedCapacity?.id === capacity.id ? 'selected' : ''
							}`}
						>
							{capacity.value}
						</div>
					))}
				</div>
			</div>
		) : (
			<></>
		);
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
							<this.getSizeAttribute item={item} />
							<this.getColorAttribute item={item} />
							<this.getCapacityAttribute item={item} />
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
