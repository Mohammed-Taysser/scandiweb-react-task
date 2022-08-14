import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { exchangePrice } from '../utils/exchange';
import cartIcon from '../assets/images/icons/cart-white.svg';
import { categoryProductHOC } from '../HOC/apollo';
import withParamsHOC from '../HOC/withParams';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

class Category extends Component {
	onAddToCartClick = (product) => {
		console.log(product);
	};

	productList = () => {
		const { loading, error, data } = this.props.query;

		if (loading) {
			return <Spinner />;
		} else if (error) {
			return <Alert>{error.message}</Alert>;
		} else if (data?.category) {
			const { products } = data.category;
			return (
				<>
					{products.map((product) => (
						<div
							className={`single-product ${product.inStock ? '' : 'out-stock'}`}
							key={product.id}
						>
							<div className='product-image-wrapper'>
								<img
									src={product.gallery[0]}
									className='product-image'
									alt={product.name}
								/>
								{product.inStock && (
									<button
										className='add-to-cart'
										onClick={() => this.onAddToCartClick(product)}
									>
										<img src={cartIcon} alt='cart icon' />
									</button>
								)}
							</div>
							<div className='product-info-wrapper'>
								<Link to={`/product/${product.id}`} className='product-title'>
									{product.name} {product.brand}
								</Link>
								<div className='product-price'>
									{this.props.currency.symbol}{' '}
									{exchangePrice(product.prices, this.props.currency)}
								</div>
							</div>
						</div>
					))}
				</>
			);
		} else {
			return <Alert>no category found</Alert>;
		}
	};

	render() {
		return (
			<div className='category-page'>
				<div className='container'>
					<h1 className='display-5'>
						category name: {this.props.params.title || 'all'}
					</h1>
					<div className='category-wrapper'>
						<this.productList />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { currency: state.currency.value };
}

export default connect(mapStateToProps)(
	withParamsHOC(categoryProductHOC(Category))
);
