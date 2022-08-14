import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exchangeTax } from '../utils/exchange';
import { cartItemsLength, cartTotalFees } from '../utils/cart';
import CartItems from '../components/CartItems';

class Cart extends Component {
	render() {
		return (
			<div>
				<div className='container'>
					<h1 className='display-5'>CART</h1>
					<CartItems withBorder withSlider />
					<div className='cart-info'>
						<div className='cart-title'>
							tax 20%:
							<strong>
								{this.props.currency.symbol} {exchangeTax(this.props.currency)}
							</strong>
						</div>
						<div className='cart-title'>
							quantity: <strong>{cartItemsLength(this.props.cart)}</strong>
						</div>
						<div className='cart-title'>
							total:{' '}
							<strong>
								{this.props.currency.symbol}{' '}
								{cartTotalFees(this.props.cart, this.props.currency)}
							</strong>
						</div>
						<button className='btn-aurora btn-order'>ORDER</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { currency: state.currency.value, cart: state.cart.items };
}

export default connect(mapStateToProps)(Cart);
