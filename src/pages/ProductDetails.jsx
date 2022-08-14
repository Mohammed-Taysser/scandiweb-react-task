import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { exchangePrice } from '../utils/exchange';
import withParams from '../provider/withParams';
import PRODUCTS from '../constants/cart';
import {
	CapacityAttribute,
	ColorAttribute,
	SizeAttribute,
} from '../utils/productAttribute';

class ProductDetails extends Component {
	state = {
		product: null,
		imagePreview: '',
	};

	componentDidMount() {
		let currentProduct = PRODUCTS.find(
			(product) => product.id === this.props.params.id
		);
		this.setState({
			product: currentProduct,
			imagePreview: currentProduct.gallery[0],
		});
	}
	render() {
		return this.state.product ? (
			<div className='product-details-page'>
				<div className='container'>
					<div className='product-details'>
						<div className='product-image'>
							<div className='gallery'>
								{this.state.product.gallery.map((image, index) => (
									<img
										src={image}
										alt={this.state.product.name}
										key={index}
										onClick={() => {
											this.setState({ imagePreview: image });
										}}
									/>
								))}
							</div>
							<div className='image'>
								<img
									src={this.state.imagePreview}
									alt={this.state.product.name}
								/>
							</div>
						</div>
						<div className='item-info'>
							<h3 className='item-title'>{this.state.product.name}</h3>
							<h5 className='item-brand'>{this.state.product.brand}</h5>

							<SizeAttribute item={this.state.product} />
							<ColorAttribute item={this.state.product} />
							<CapacityAttribute item={this.state.product} />

							<div className='item-price'>
								<p className='item-attribute-label'>price:</p>
								<span className='item-currency-symbol'>
									{this.props.currency.symbol}
								</span>{' '}
								<span className='item-currency-value'>
									{exchangePrice(
										this.state.product.prices,
										this.props.currency
									)}
								</span>
							</div>
							<button className='btn-aurora btn-cart'>ADD TO CART</button>
							<div className='product-description'>
								{parse(this.state.product.description)}
							</div>
						</div>
					</div>
				</div>
			</div>
		) : (
			<>no product found</>
		);
	}
}

function mapStateToProps(state) {
	return { currency: state.currency.value };
}

export default connect(mapStateToProps)(withParams(ProductDetails));
