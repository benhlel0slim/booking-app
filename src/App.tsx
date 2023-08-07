import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';

const Client = lazy(() => import('./components/client/client'));
const Layout = lazy(() => import('./components/layout/layout'));
const Button = lazy(() => import('@mui/material/Button'));
const AdminMenu = lazy(() => import('./components/menu/adminMenu/adminMenu'));
const SignupForm = lazy(
  () => import('./components/user/signupForm/signupForm')
);
const LoginForm = lazy(() => import('./components/user/loginForm/loginForm'));
const CreateRestaurant = lazy(
  () => import('./components/restaurant/createRestaurant/createRestaurant')
);
const EditRestaurant = lazy(
  () => import('./components/restaurant/editRestaurant/editRestaurant')
);
const AdminReservation = lazy(
  () => import('./components/reservation/adminReservation/adminReservation')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: 'restaurant/:restaurantId',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Client />
          </Suspense>
        ),
      },
      {
        path: 'admin/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        ),
      },
      {
        path: 'admin/signup',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
          </Suspense>
        ),
      },
      {
        path: 'admin/restaurant',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CreateRestaurant />
          </Suspense>
        ),
      },
      {
        path: 'admin/restaurant/:restaurantId/edit',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditRestaurant />
          </Suspense>
        ),
      },
      {
        path: `/admin/restaurant/:restaurantId/menu`,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminMenu />
          </Suspense>
        ),
      },
      {
        path: `/admin/restaurant/:restaurantId/reservation`,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminReservation />
          </Suspense>
        ),
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
