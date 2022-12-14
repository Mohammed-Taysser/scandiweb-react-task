import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { cartTotalFees } from '../utils/cart';
import CartList from './CartList';
import Alert from './Alert';
import cartIcon from '../assets/images/icons/cart.svg';
import { updateCartItem } from '../redux/features/cart.slice';
import withNavigateHOC from '../HOC/withNavigation';

class MiniCart extends Component {
	state = {
		isOpen: this.props.isOpen || false,
		dropdownWrapperRef: createRef(),
		dropdownToggleRef: createRef(),
	};

	componentDidMount() {
		// Assign click handler to listen the click to close the dropdown when clicked outside
		document.addEventListener('click', this.onClickOutside);
	}

	componentWillUnmount() {
		// Remove the listener
		document.removeEventListener('click', this.onClickOutside);
	}

	// If click is outside the dropdown button or display area Close the dropdown
	onClickOutside = (evt) => {
		if (
			!this.state.dropdownWrapperRef.current.contains(evt.target) &&
			!this.state.dropdownToggleRef.current.contains(evt.target)
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

	onViewBagClick = () => {
		this.toggleDropDownVisibility();
		this.props.navigateTo('/cart');
	};

	render() {
		return (
			<div className='mini-cart-dropdown'>
				<div
					className='min-cart-dropdown-toggle'
					onClick={this.toggleDropDownVisibility}
					ref={this.state.dropdownToggleRef}
				>
					<img src={cartIcon} alt='cart icon' />
					<span className='cart-counter'>{this.props.cart.length}</span>
				</div>
				<div
					className={`mini-cart-dropdown-wrapper ${
						this.state.isOpen ? 'open' : ''
					}`}
					ref={this.state.dropdownWrapperRef}
				>
					<div className='cart-hero-title'>
						<strong>my bag</strong> {this.props.cart.length} items
					</div>
					{Object.keys(this.props.cart.items).length ? (
						<CartList
							cart={this.props.cart.items}
							onQuantityChange={(payload) => this.props.updateCartItem(payload)}
						/>
					) : (
						<Alert>no cart items yet</Alert>
					)}
					<div className='total-title'>
						<span>total</span>
						<span>
							{this.props.currency.symbol}{' '}
							{cartTotalFees(this.props.cart.items, this.props.currency)}
						</span>
					</div>
					<div className='cart-navigation'>
						<button
							className='btn-aurora btn-bag'
							onClick={this.onViewBagClick}
						>
							VIEW BAG
						</button>
						<button className='btn-aurora btn-checkout'>CHECKOUT</button>
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
		updateCartItem: (payload) => dispatch(updateCartItem(payload)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNavigateHOC(MiniCart));
