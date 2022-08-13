import React, { Component } from 'react';
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
							tax 20%: <strong>$ 42.00</strong>
						</div>
						<div className='cart-title'>
							quantity: <strong>10</strong>
						</div>
						<div className='cart-title'>
							total: <strong>$ 402.00</strong>
						</div>
						<button className='btn-aurora btn-order'>ORDER</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Cart;
