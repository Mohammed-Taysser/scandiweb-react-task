import { gql } from '@apollo/client';

function getCategoryByTitle(title = 'all') {
	return gql`
	 query {
		category(input:{title: \"${title}\"}){
			name
		products{
			id
			name
			inStock
			description
			attributes{
				id
				name
				type
				items{
					value
					id
				}
			}
			gallery
			prices{
				currency{
					label
					symbol
				}
				amount
			}
		}
		}
	}
	`;
}

function getAllCategory() {
	return gql`
		query {
			categories {
				name
				products {
					id
					name
					inStock
					description
					category
					gallery
					brand
					attributes {
						id
						name
						type
						items {
							id
							displayValue
							value
						}
					}
					prices {
						currency {
							label
							symbol
						}
						amount
					}
				}
			}
		}
	`;
}

export { getCategoryByTitle, getAllCategory };
