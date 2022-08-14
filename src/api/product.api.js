import { gql } from '@apollo/client';

function getProductById(id = '') {
	return gql`
		query {
			product(id: \"${id}\") {
				id
				name
				inStock
				category
				description
				attributes {
					id
					name
					type
					items {
						value
						id
					}
				}
				gallery
				brand
				prices {
					currency {
						label
						symbol
					}
					amount
				}
			}
		}
	`;
}

export { getProductById };
