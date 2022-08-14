import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Routes from './routes';
import './assets/scss/core.scss';

class App extends Component {
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
