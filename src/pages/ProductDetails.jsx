import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { exchangePrice } from '../utils/exchange';
import withParamsHOC from '../HOC/withParams';
import {
	CapacityAttribute,
	ColorAttribute,
	SizeAttribute,
} from '../utils/productAttribute';
import { productDetailsHOC } from '../HOC/apollo';

class ProductDetails extends Component {
	state = {
		imagePreview: '',
	};

	Render = () => {
		const { loading, error, data } = this.props.query;
		if (loading) {
			return <>loading</>;
		} else if (error) {
			return <>error</>;
		} else if (data?.product) {
			const { product } = data;
			return (
				<div className='product-details-page'>
					<div className='container'>
						<div className='product-details'>
							<div className='product-image'>
								<div className='gallery'>
									{product.gallery.map((image, index) => (
										<img
											src={image}
											alt={product.name}
											key={index}
											onClick={() => {
												this.setState({ imagePreview: image });
											}}
										/>
									))}
								</div>
								<div className='image'>
									<img
										src={this.state.imagePreview || product.gallery[0]}
										alt={product.name}
									/>
								</div>
							</div>
							<div className='item-info'>
								<h3 className='item-title'>{product.name}</h3>
								<h5 className='item-brand'>{product.brand}</h5>

								<SizeAttribute item={product} />
								<ColorAttribute item={product} />
								<CapacityAttribute item={product} />

								<div className='item-price'>
									<p className='item-attribute-label'>price:</p>
									<span className='item-currency-symbol'>
										{this.props.currency.symbol}
									</span>{' '}
									<span className='item-currency-value'>
										{exchangePrice(product.prices, this.props.currency)}
									</span>
								</div>
								<button className='btn-aurora btn-cart'>ADD TO CART</button>
								<div className='product-description'>
									{parse(product.description)}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <>no product found</>;
		}
	};
	render() {
		return <this.Render />;
	}
}

function mapStateToProps(state) {
	return { currency: state.currency.value };
}

export default connect(mapStateToProps)(
	withParamsHOC(productDetailsHOC(ProductDetails))
);
