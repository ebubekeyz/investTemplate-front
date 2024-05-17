import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { updateBalance } from './features/package/packageSlice';
import { packageCalculations } from './features/package/packageSlice';
import { loadPackage } from './features/package/packageSlice';
import { loadReferral } from './features/package/packageSlice';
import { loadWithdraw } from './features/package/packageSlice';

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
  Referrals,
  Pricing,
  WithdrawList,
} from './pages';

import { loader as referralLoader } from './pages/Referrals';
import { loader as PackageLoader } from './pages/Investment';
import { loader as dashboardLoader } from './pages/Dashboard';
import { loader as withdrawLoader } from './pages/Withdraw';
import { loader as payLoader } from './pages/Pay';
import { loader as settingsLoader } from './pages/Settings';
import { loader as updatePasswordLoader } from './pages/UpdatePassword';
import { loader as withdrawListLoader } from './pages/WithdrawList';

import { action as loginAction } from './pages/Login';
import { action as withdrawAction } from './components/Withdrawal';
import { action as registerAction } from './pages/Register';
import { action as settingsAction } from './components/Settings';
import { action as updatePasswordAction } from './components/UpdatePassword';
import { action as payAction } from './components/Pay';

import { store } from './store';
import { ErrorElement } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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
        loader: settingsLoader(store),
        action: settingsAction(store),
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: dashboardLoader(store, queryClient),
      },
      {
        path: 'investment',
        element: <Investment />,
        loader: PackageLoader(store, queryClient),
      },
      {
        path: 'withdraw',
        element: <Withdraw />,
        loader: withdrawLoader(store),
        action: withdrawAction(store, queryClient),
      },
      {
        path: 'referrals',
        element: <Referrals />,
        loader: referralLoader(store, queryClient),
      },
      {
        path: 'updatePassword',
        element: <UpdatePassword />,
        loader: updatePasswordLoader(store),
        action: updatePasswordAction(store),
      },
      {
        path: 'withdrawList',
        element: <WithdrawList />,
        loader: withdrawListLoader(store, queryClient),
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'pay',
        element: <Pay />,
        loader: payLoader(store),
        action: payAction(store),
      },
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  useEffect(() => {
    dispatch(loadPackage());
    dispatch(loadReferral());
    dispatch(loadWithdraw());
    dispatch(updateBalance());
    dispatch(packageCalculations());
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
