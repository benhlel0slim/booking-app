import React from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Client from './components/client/client';
import Layout from './components/layout/layout';
import Button from '@mui/material/Button';
import SignupForm from './components/user/signupForm/signupForm';
import LoginForm from './components/user/loginForm/loginForm';
import AddRestaurant from './components/restaurant/addRestaurant/addRestaurant';

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
				element: <LoginForm />,
			},
			{
				path: 'admin/signup',
				element: <SignupForm />,
			},
			{
				path: 'admin/restaurant',
				element: (
					<AddRestaurant
						title="Veuillez"
						boldedTitle="créer votre resto"
						btn="CREER"
					/>
				),
			},
			{
				path: 'admin/restaurant/:id',
				element: (
					<AddRestaurant
						title="Modifier"
						boldedTitle=" votre resto"
						btn="ENREGISTRER"
					/>
				),
			},
			{
				path: '/',
				element: (
					<div className="demoLink">
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
