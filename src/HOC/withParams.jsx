import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * HOC to wrap react-router-dom params into class base component
 * @see https://github.com/remix-run/react-router/issues/8146#issuecomment-947860640
 * @see https://infinum.com/blog/how-to-use-react-hooks-in-class-components/
 * @param {*} Component
 * @returns JSX
 */
function withParamsHOC(Component) {
	return (props) => <Component {...props} params={useParams()} />;
}

export default withParamsHOC;
