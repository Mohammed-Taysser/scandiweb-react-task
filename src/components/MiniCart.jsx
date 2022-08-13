import React, { Component } from 'react';
import CartItems from './CartItems';
import cartIcon from '../assets/images/icons/cart.svg';
import { Link } from 'react-router-dom';

class MiniCart extends Component {
	state = {
		isOpen: this.props.isOpen || false,
	};

	componentDidMount() {
		// Assign click handler to listen the click to close the dropdown when clicked outside
		document.addEventListener('click', this.OnClickOutside);
	}

	componentWillUnmount() {
		// Remove the listener
		document.removeEventListener('click', this.OnClickOutside);
	}

	// If click is outside the dropdown button or display area Close the dropdown
	OnClickOutside = (evt) => {
		const path = evt.path || (evt.composedPath && evt.composedPath());

		if (
			!path.includes(this.displayAreaRef) &&
			!path.includes(this.dropTogglerRef)
		) {
			this.setState({
				isOpen: false,
			});
			document.body.classList.remove('opened-mini-cart');
		}
	};

	// DropDown toggler
	toggleDropDownVisibility = () => {
		this.setState((st) => ({ isOpen: !st.isOpen }));
		document.body.classList.toggle('opened-mini-cart');
	};

	render() {
		return (
			<div className='mini-cart-dropdown'>
				<div
					className='min-cart-dropdown-toggle'
					onClick={this.toggleDropDownVisibility}
					ref={(ref) => (this.dropTogglerRef = ref)}
				>
					<img src={cartIcon} alt='cart icon' />
					<span className='cart-counter'>10</span>
				</div>
				<div
					className={`mini-cart-dropdown-wrapper ${
						this.state.isOpen ? 'open' : ''
					}`}
					ref={(ref) => (this.displayAreaRef = ref)}
				>
					<div className='cart-hero-title'>
						<strong>my bag</strong> 30 items
					</div>
					<CartItems />
					<div className='total-title'>
						<span>total</span>
						<span>$ 200.00</span>
					</div>
					<div className='cart-navigation'>
						<Link to='/cart' className='btn-aurora btn-bag'>
							VIEW BAG
						</Link>
						<button className='btn-aurora btn-checkout'>CHECKOUT</button>
					</div>
				</div>
			</div>
		);
	}
}

export default MiniCart;