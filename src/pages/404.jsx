import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundImage from '../assets/images/background/404-page.svg';

function PageNotFound() {
	return (
		<div className='page-not-found'>
			<div>
				<img src={PageNotFoundImage} alt='404 page' />
				<h2 className='title'>Oops… You just found an error page</h2>
				<h3 className='subtitle'>
					We are sorry but the page you are looking for was not found
				</h3>
				<Link to='/' className='btn btn-aurora'>
					Take me home
				</Link>
			</div>
		</div>
	);
}

export default PageNotFound;
