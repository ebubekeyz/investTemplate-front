import { toast } from 'react-toastify';
import { customFetch } from '../utils';

import {
  Breadcrumb,
  ComplexPaginationContainer,
  Filters,
  ReferralComponent,
  SectionTitle,
} from '../components';
import { redirect, useLoaderData } from 'react-router-dom';
import { addReferral } from '../features/package/packageSlice';

const referralQuery = (queryParams, id) => {
  const { name, email, ref, date, balance, page } = queryParams;
  return {
    queryKey: [
      'referrals',
      name ?? '',
      email ?? '',
      ref ?? '',
      date ?? '',
      balance ?? '',
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(`/auth?ref=${id}&sort=latest`, {
        params: queryParams,
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
      referralQuery(params, user._id)
    );

    store.dispatch(addReferral(resp.data.users));
    const referral = resp.data.users;

    const meta = resp.data.meta;

    return { referral, meta, params };
  };

const Referrals = () => {
  const { referral } = useLoaderData();
  if (referral.length === 0) {
    return (
      <div className="align-element mt-10">
        <SectionTitle text="No Referrals" />
      </div>
    );
  }
  return (
    <div className="align-element my-8">
      <Breadcrumb text1="Home" url1="/" text2="Referral" url2="/referrals" />
      <Filters />
      <ReferralComponent />
      <ComplexPaginationContainer />
    </div>
  );
};
export default Referrals;
