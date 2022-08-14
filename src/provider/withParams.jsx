import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * wrap react-router-dom params into class base component
 * @see https://github.com/remix-run/react-router/issues/8146#issuecomment-947860640
 * @param {*} Component
 * @returns JSX
 */
function withParams(Component) {
	return (props) => <Component {...props} params={useParams()} />;
}

export default withParams;
