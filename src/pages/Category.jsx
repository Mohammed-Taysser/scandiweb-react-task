import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/images/icons/cart-white.svg';
import PRODUCT from '../constants/cart';
import useProductPrice from '../hooks/useProductPrice';

class Category extends Component {
	onAddToCartClick = (product) => {
		console.log(product);
	};

	productList = () => {
		return (
			<>
				{PRODUCT.map((product) => (
					<div
						className={`single-product ${product.inStock ? '' : 'out-stock'}`}
						key={product.id}
					>
						<div className='product-image-wrapper'>
							<img
								src={product.gallery[0]}
								className='product-image'
								alt='product-title'
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
								$ {useProductPrice(product.prices)}
							</div>
						</div>
					</div>
				))}
			</>
		);
	};

	render() {
		return (
			<div className='category-page'>
				<div className='container'>
					<h1 className='display-5'>category name</h1>
					<div className='category-wrapper'>
						<this.productList />
					</div>
				</div>
			</div>
		);
	}
}

export default Category;
