import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * HOC to wrap react-router-dom useNavigate into class base component
 * @param {*} Component
 * @returns JSX
 */
function withNavigateHOC(Component) {
	return (props) => <Component {...props} navigateTo={useNavigate()} />;
}

export default withNavigateHOC;
