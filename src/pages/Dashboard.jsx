import { redirect } from 'react-router-dom';
import { customFetch } from '../utils';
import { addItem } from '../features/package/packageSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  Breadcrumb,
  DashboardCol1,
  DashboardCol2,
  SectionTitle,
} from '../components';

const dashboardQuery = (name, token) => {
  return {
    queryKey: ['dashboard', name],
    queryFn: () =>
      customFetch(`/package?status=paid`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  };
};

export const loader = (store, queryClient) => async () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('You must log in to view this page');
    return redirect('/login');
  }

  const resp = await queryClient.ensureQueryData(
    dashboardQuery(user.name, user.token)
  );

  store.dispatch(addItem(resp.data.packages));

  const packages = resp.data.packages;

  return { packages };
};

const Dashboard = () => {
  const packages = useSelector((state) => state.packageState.package);
  // console.log(Object.values(packages));
  return (
    <section className="align-element mt-4">
      <Breadcrumb text1="Home" url1="/" text2="Dashboard" url2="/dashboard" />
      <div className="grid grid-col-1 lg:grid-cols-12">
        <div className="lg:col-span-7 border-r-2 border-r-base-200 ">
          <DashboardCol1 />
        </div>
        <div className="lg:col-span-5">
          <DashboardCol2 />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
