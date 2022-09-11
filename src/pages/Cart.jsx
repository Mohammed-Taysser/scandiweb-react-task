import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from '../components/Alert';
import CartList from '../components/CartList';
import { exchangeTax } from '../utils/exchange';
import { cartTotalFees } from '../utils/cart';
import { updateCartItem } from '../redux/features/cart.slice';

class Cart extends Component {
	render() {
		return (
			<div>
				<div className='container'>
					<h1 className='display-5'>CART</h1>
					{this.props.cart.items.length > 0 ? (
						<>
							<CartList
								withBorder
								withSlider 
								removable
								cart={this.props.cart.items}
								onQuantityChange={(payload) =>
									this.props.updateCartItem(payload)
								}
							/>
							<div className='cart-info'>
								<div className='cart-title'>
									tax 20%:
									<strong>
										{this.props.currency.symbol}{' '}
										{exchangeTax(this.props.currency)}
									</strong>
								</div>
								<div className='cart-title'>
									quantity: <strong>{this.props.cart.length}</strong>
								</div>
								<div className='cart-title'>
									total:{' '}
									<strong>
										{this.props.currency.symbol}{' '}
										{cartTotalFees(this.props.cart.items, this.props.currency)}
									</strong>
								</div>
								<button className='btn-aurora btn-order'>ORDER</button>
							</div>
						</>
					) : (
						<Alert>no cart items yet</Alert>
					)}
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
		updateCartItem: (payload) => dispatch(updateCartItem(payload)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
