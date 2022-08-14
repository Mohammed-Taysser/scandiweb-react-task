import React from 'react';
import { useQuery } from '@apollo/client';
import { getProductById } from '../api/product.api';
import { getCategoryByTitle } from '../api/category.api';

/**
 * HOC for fetching product data as props
 * must be after `withParams` HOC as it use `product id` from `params`
 * @param {*} Component
 * @returns JSX
 */
function productDetailsHOC(Component) {
	return (props) => (
		<Component {...props} query={useQuery(getProductById(props.params.id))} />
	);
}

/**
 * HOC for fetching category product as props
 * can be after `withParams` HOC as it use `category title` from `params` or it will use `all` as default title
 * @param {*} Component
 * @param {String} title category title
 * @returns JSX
 */
function categoryProductHOC(Component, title = 'all') {
	return (props) => (
		<Component
			{...props}
			query={useQuery(getCategoryByTitle(props?.params?.title || title))}
		/>
	);
}

export { productDetailsHOC, categoryProductHOC };
