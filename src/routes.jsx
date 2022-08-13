import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Cart from './pages/Cart';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import PageNotFound from './pages/404';

function MainRoutes() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0 });
		// scroll to the top of the browser window when changing route
		// the window object is a normal DOM object and is safe to use in React.
	}, [location]);

	return (
		<Routes>
			<Route path='*' element={<PageNotFound />} />
			<Route path='/' element={<Category />} />
			<Route path='/cart' element={<Cart />} />
			<Route path='/product/:id' element={<ProductDetails />} />
		</Routes>
	);
}

export default MainRoutes;
