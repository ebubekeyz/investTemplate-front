import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  HomeLayout,
  Landing,
  Error,
  About,
  Register,
  Login,
  Terms,
  Privacy,
  Settings,
  Dashboard,
  Investment,
  Withdraw,
  Pay,
  UpdatePassword,
} from './pages';

import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';
import { action as settingsAction } from './pages/Settings';
import { action as updatePasswordAction } from './pages/UpdatePassword';
import { action as payAction } from './pages/Pay';

import { store } from './store';
import { ErrorElement } from './components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },

      { path: 'about', element: <About /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
      {
        path: 'settings',
        element: <Settings />,
        action: settingsAction(store),
      },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'investment', element: <Investment /> },
      { path: 'withdraw', element: <Withdraw /> },
      {
        path: 'updatePassword',
        element: <UpdatePassword />,
        action: updatePasswordAction(store),
      },
      { path: 'pay', element: <Pay />, action: payAction(store) },
    ],
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
