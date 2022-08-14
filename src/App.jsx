import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Routes from './routes';
import './assets/scss/core.scss';

class App extends Component {
	componentDidMount() {
		// remove loading after content load
		window.onload = function () {
			document.body.classList.remove('load');
		};
	}
	render() {
		return (
			<>
				<Navbar />
				<Routes />
			</>
		);
	}
}

export default App;
