import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import favicon from '../assets/images/icons/favicon.png';
import CurrencySwitcher from '../components/CurrencySwitcher';
import MiniCart from '../components/MiniCart';

class Navbar extends Component {
	render() {
		return (
			<div className='navbar'>
				<div className='container'>
					<ul className='navbar-menu'>
						<li>
							<Link to='/' className='navbar-link active'>
								WOMEN
							</Link>
						</li>
						<li>
							<Link to='/' className='navbar-link'>
								MEN
							</Link>
						</li>
						<li>
							<Link to='/' className='navbar-link'>
								kids
							</Link>
						</li>
					</ul>
					<div className='navbar-brand'>
						<Link to='/'>
							<img src={favicon} alt='website favicon' />
						</Link>
					</div>
					<div className='dropdown-wrapper'>
						<div className='navbar-currency'>
							<CurrencySwitcher />
						</div>
						<div className='navbar-cart'>
							<MiniCart />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Navbar;
