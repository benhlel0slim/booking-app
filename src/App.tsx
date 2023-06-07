import React from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Client from './components/client/client';
import Layout from './components/layout/layout';
import Button from '@mui/material/Button';
import Admin from './components/admin/admin';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: 'restaurant/:restaurantId',
				element: <Client />,
			},
			{
				path: 'admin/login',
				element: <Admin />,
			},
			{
				path: '/',
				element: (
					<div className={'demoLink'}>
						<Link to={'admin/login'}>
							<Button variant="contained">Admin</Button>
						</Link>
						<Link to={'/restaurant/62c1a011e95e96a91dbfd023?step=guest'}>
							<Button variant="contained">Client</Button>
						</Link>
					</div>
				),
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
