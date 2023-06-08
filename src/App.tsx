import React from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Client from './components/client/client';
import Layout from './components/layout/layout';
import Button from '@mui/material/Button';
import User from './components/user/loginForm/loginForm';
/* import SignupForm from './components/user/signupForm/signupForm'; */

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
				element: <User />,
			},
			/* {
				path: 'admin/signup',
				element: <SignupForm />,
			}, */
			{
				path: '/',
				element: (
					<div className={'demoLink'}>
						<Link to={'/restaurant/62c1a011e95e96a91dbfd023?step=guest'}>
							<Button variant="contained">Demo</Button>
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
