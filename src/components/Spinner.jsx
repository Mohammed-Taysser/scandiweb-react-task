import React, { Component } from 'react';

class Spinner extends Component {
	render() {
		return <span className={`spinner ${this.props.center && 'center'}`}></span>;
	}
}

Spinner.defaultProps = {
	center: false,
};

export default Spinner;
