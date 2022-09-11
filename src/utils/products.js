import ATTRIBUTES from '../constants/attributes';
import getTypeOf from './getTypeOf';

/**
 *
 * 1. detect product attributes and turn them as object with it's id as key
 * 2. append default(selected attribute) value as first attribute item
 * 3. check if given attribute is array of object, array mean there is no selected key 😌
 *
 * @param {Array} productAttribute product attributes
 * @returns {Object} refactored attributes
 */
function refactorProductAttribute(productAttribute) {
	let refactoredAttribute = {};

	if (getTypeOf(productAttribute) === 'Array') {
		ATTRIBUTES.forEach((attribute) => {
			const currentAttribute = productAttribute.find(
				(attr) => attr.id === attribute
			);

			if (currentAttribute) {
				refactoredAttribute[currentAttribute.id] = {
					...currentAttribute,
					selected: currentAttribute.items[0].id,
				};
			}
		});
	} else if (getTypeOf(productAttribute) === 'Object') {
		refactoredAttribute = productAttribute;
	}

	return refactoredAttribute;
}

export { refactorProductAttribute };
