import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrency } from '../redux/features/currency.slice';
import { CURRENCY } from '../constants/currency';
import arrowTop from '../assets/images/icons/arrow/arrow-top.svg';
import arrowBottom from '../assets/images/icons/arrow/arrow-bottom.svg';

class CurrencySwitcher extends Component {
	state = {
		isOpen: this.props.isOpen || false,
		selectedCurrency: CURRENCY[0],
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
		}
	};

	// DropDown toggler
	toggleDropDownVisibility = () => {
		this.setState((st) => ({ isOpen: !st.isOpen }));
	};

	onCurrencyChange = (currency) => {
		this.props.changeCurrency(currency);
		this.setState({
			isOpen: false,
		});
	};

	CurrencyToggle = () => {
		return (
			<span className='currency-dropdown-icon'>
				<span className='symbol'>{this.props.currency.symbol}</span>
				{this.state.isOpen ? (
					<img src={arrowTop} alt='arrow-top' />
				) : (
					<img src={arrowBottom} alt='arrow-bottom' />
				)}
			</span>
		);
	};

	CurrencyItems = () => {
		return (
			<>
				{CURRENCY.map((currency) => (
					<li
						ref={(ref) => (this.displayAreaRef = ref)}
						key={currency.label}
						className={`currency-dropdown-item ${
							this.props.currency.label === currency.label ? 'selected' : ''
						}`}
						onClick={() => this.onCurrencyChange(currency)}
					>
						{currency.symbol}
						<span className='label'>{currency.label}</span>
					</li>
				))}
			</>
		);
	};

	render() {
		return (
			<div className='currency-dropdown'>
				<div
					className='currency-dropdown-toggle'
					onClick={this.toggleDropDownVisibility}
					ref={(ref) => (this.dropTogglerRef = ref)}
				>
					<this.CurrencyToggle />
				</div>
				<ul
					className={`currency-dropdown-wrapper ${
						this.state.isOpen ? 'open' : ''
					}`}
				>
					<this.CurrencyItems />
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { currency: state.currency.value };
}

function mapDispatchToProps(dispatch) {
	return {
		changeCurrency: (currency) => dispatch(changeCurrency(currency)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
