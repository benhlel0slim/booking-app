import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Client from './components/client';
import Layout from './components/layout';

const id = '62c1a011e95e96a91dbfd023';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'restaurant/:restaurantId',
				element: <Client />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
