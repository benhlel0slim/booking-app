import React from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Client from './components/client/client';
import Layout from './components/layout/layout';
import Button from '@mui/material/Button';
import SignupForm from './components/user/signupForm/signupForm';
import LoginForm from './components/user/loginForm/loginForm';
import CreateRestaurant from './components/restaurant/createRestaurant/createRestaurant';
import EditRestaurant from './components/restaurant/editRestaurant/editRestaurant';
import AdminMenu from './components/menu/adminMenu/adminMenu';
import AdminReservation from './components/reservation/adminReservation/adminReservation';

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
				element: <CreateRestaurant />,
			},
			{
				path: 'admin/restaurant/:restaurantId/edit',
				element: <EditRestaurant />,
			},
			{
				path: `/admin/restaurant/:restaurantId/menu`,
				element: <AdminMenu />,
			},
			{
				path: `/admin/restaurant/:restaurantId/reservation`,
				element: <AdminReservation />,
			},
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
