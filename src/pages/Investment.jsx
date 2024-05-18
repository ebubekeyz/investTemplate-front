import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import {
  Breadcrumb,
  ComplexPaginationContainer,
  PackageComponent,
  PackageFilters,
  SectionTitle,
} from '../components';
import { redirect, useLoaderData } from 'react-router-dom';

const investmentQuery = (queryParams, id, token) => {
  const { date, amount, plan, page } = queryParams;
  return {
    queryKey: ['Investment', date ?? '', amount ?? '', plan ?? '', page ?? 1],
    queryFn: () =>
      customFetch(`/package?status=paid`, {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must be logged in to view this page');
      return redirect('/login');
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const resp = await queryClient.ensureQueryData(
      investmentQuery(params, user._id, user.token)
    );

    const packages = resp.data.packages;

    const meta = resp.data.meta;

    return { packages, meta, params };
  };

const Investment = () => {
  const { packages } = useLoaderData();
  if (packages.length === 0) {
    return (
      <div className="align-element mt-10">
        <SectionTitle text="No Investment Package" />
      </div>
    );
  }
  return (
    <div className="align-element my-8">
      <Breadcrumb text1="Home" url1="/" text2="Investment" url2="/investment" />
      <PackageFilters />
      <PackageComponent />
      <ComplexPaginationContainer />
    </div>
  );
};
export default Investment;
