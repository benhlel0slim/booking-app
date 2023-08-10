import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout/layout';
import Client from './components/client/client';
import { CircularProgress } from '@mui/material';
import Demo from './components/demo/demo';

const AdminMenu = lazy(
  () =>
    import(
      /* webpackChunkName: "AdminMenu" */ './components/menu/adminMenu/adminMenu'
    )
);
const SignupForm = lazy(
  () =>
    import(
      /* webpackChunkName: "SignupForm" */ './components/user/signupForm/signupForm'
    )
);
const LoginForm = lazy(
  () =>
    import(
      /* webpackChunkName: "LoginForm" */ './components/user/loginForm/loginForm'
    )
);
const CreateRestaurant = lazy(
  () =>
    import(
      /* webpackChunkName: "CreateRestaurant" */ './components/restaurant/createRestaurant/createRestaurant'
    )
);
const EditRestaurant = lazy(
  () =>
    import(
      /* webpackChunkName: "EditRestaurant" */ './components/restaurant/editRestaurant/editRestaurant'
    )
);
const AdminReservation = lazy(
  () =>
    import(
      /* webpackChunkName: "AdminReservation" */ './components/reservation/adminReservation/adminReservation'
    )
);

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
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LoginForm />
          </Suspense>
        ),
      },
      {
        path: 'admin/signup',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <SignupForm />
          </Suspense>
        ),
      },
      {
        path: 'admin/restaurant',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <CreateRestaurant />
          </Suspense>
        ),
      },
      {
        path: 'admin/restaurant/:restaurantId/edit',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <EditRestaurant />
          </Suspense>
        ),
      },
      {
        path: `/admin/restaurant/:restaurantId/menu`,
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AdminMenu />
          </Suspense>
        ),
      },
      {
        path: `/admin/restaurant/:restaurantId/reservation`,
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AdminReservation />
          </Suspense>
        ),
      },
      {
        path: '/',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Demo />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
