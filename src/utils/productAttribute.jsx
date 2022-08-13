import React from 'react';

function CapacityAttribute({ item }) {
	const capacities = item.attributes.find((attr) => attr.id === 'Capacity');

	return capacities ? (
		<div className='item-capacity'>
			<p className='item-attribute-label'>capacity:</p>
			<div className='item-capacity-list'>
				{capacities.items.map((capacity) => (
					<div
						key={capacity.id}
						className={`single-capacity ${
							item?.selectedCapacity?.id === capacity.id ? 'selected' : ''
						}`}
					>
						{capacity.value}
					</div>
				))}
			</div>
		</div>
	) : (
		<></>
	);
}

function SizeAttribute({ item }) {
	const sizes = item.attributes.find((attr) => attr.id === 'Size');

	return sizes ? (
		<div className='item-sizes'>
			<p className='item-attribute-label'>sizes:</p>
			<div className='item-sizes-list'>
				{sizes.items.map((size) => (
					<div
						key={size.id}
						className={`single-size ${
							item?.selectedSize?.id === size.id ? 'selected' : ''
						}`}
					>
						{size.value}
					</div>
				))}
			</div>
		</div>
	) : (
		<></>
	);
}

function ColorAttribute({ item }) {
	const colors = item.attributes.find((attr) => attr.id === 'Color');

	return colors ? (
		<div className='item-colors'>
			<p className='item-attribute-label'>colors:</p>
			<div className='item-color-list'>
				{colors.items.map((color) => (
					<div
						key={color.id}
						className={`single-color ${
							item?.selectedColor?.id === color.id ? 'selected' : ''
						}`}
						style={{ backgroundColor: color.value }}
					></div>
				))}
			</div>
		</div>
	) : (
		<></>
	);
}

export { CapacityAttribute, SizeAttribute, ColorAttribute };
