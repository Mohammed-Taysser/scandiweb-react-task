import React, { Component } from 'react';

class Alert extends Component {
	render() {
		return (
			<div className={`alert`} role='alert'>
				<div className={this.props.outerClass}>
					{this.props.children || <>A simple alert</>}
				</div>
			</div>
		);
	}
}

export default Alert;
