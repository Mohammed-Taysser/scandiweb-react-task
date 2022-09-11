import React, { Component } from 'react';
import { refactorProductAttribute } from '../utils/products';

class ProductAttribute extends Component {
	constructor(props) {
		super(props);

		this.SingleAttribute = this.SingleAttribute.bind(this);
		this.onAttributeChange = this.onAttributeChange.bind(this);
	}

	componentDidMount() {
		// use object instead of array as it's easy on search and update
		const refactoredAttributes = refactorProductAttribute(
			this.props.attributes
		);

		this.setState({ attributes: refactoredAttributes });
		if (this.props.onChange) {
			this.props?.onChange(refactoredAttributes);
		}
	}

	SingleAttribute(props) {
		const { attribute, onAttributeChange } = props;
		return (
			<div className='product-attribute'>
				<p className='product-attribute-label'>{attribute.name}:</p>
				<div
					className={`product-attribute-list ${
						attribute.id === 'Color' && 'colorful'
					}`}
				>
					{attribute.items.map((attr) => (
						<div
							key={attr.id}
							style={{ backgroundColor: attr.value }}
							onClick={() => onAttributeChange(attribute.id, attr.id)}
							className={`single-product-attribute ${
								attribute.selected === attr.id ? 'selected' : ''
							}`}
						>
							{attribute.id !== 'Color' && attr.value}
						</div>
					))}
				</div>
			</div>
		);
	}

	onAttributeChange(attributeId = '', attributeValue = '') {
		if (this.props.onChange) {
			const newAttributesState = {
				...this.state.attributes,
				[attributeId]: {
					...this.state.attributes[attributeId],
					selected: attributeValue,
				},
			};
			// ensure that attributes updated
			this.props.onChange(newAttributesState);
			this.setState({ attributes: newAttributesState });
		}
	}

	render() {
		return (
			<div className=''>
				{this.state?.attributes &&
					Object.keys(this.state.attributes).map((key) => (
						<this.SingleAttribute
							key={key}
							attribute={this.state.attributes[key]}
							onAttributeChange={this.onAttributeChange}
						/>
					))}
			</div>
		);
	}
}

ProductAttribute.defaultProps = {
	attributes: [],
};

export default ProductAttribute;
