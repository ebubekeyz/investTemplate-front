import { toast } from 'react-toastify';
import {
  ComplexPaginationContainer,
  SectionTitle,
  WithdrawList as Withdraw,
  WithdrawFilters,
} from '../components';
import { customFetch } from '../utils';
import { redirect, useLoaderData } from 'react-router-dom';
import { addWithdraw } from '../features/package/packageSlice';

const withdrawQuery = (queryParams, name, token) => {
  return {
    queryKey: ['withdraw', name],
    queryFn: () =>
      customFetch.get('/withdraw?sort=latest', {
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
      toast.success('You must be logged in to view page');
      return redirect('/login');
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const resp = await queryClient.ensureQueryData(
        withdrawQuery(params, user.name, user.token)
      );
      store.dispatch(addWithdraw(resp.data.withdraw));
      const withdraw = resp.data.withdraw;
      const meta = resp.data.meta;
      return { withdraw, meta, params };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

const WithdrawList = () => {
  const { withdraw } = useLoaderData();

  if (withdraw.length === 0) {
    return (
      <div className="align-element mt-10">
        <SectionTitle text="No Withdrawal" />
      </div>
    );
  }
  return (
    <div className="align-element my-5">
      <WithdrawFilters />
      <Withdraw />
      <ComplexPaginationContainer />
    </div>
  );
};
export default WithdrawList;
