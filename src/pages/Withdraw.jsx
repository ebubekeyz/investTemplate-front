import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { addWithdraw } from '../features/package/packageSlice';
import { Withdrawal } from '../components';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.success('You must be logged in to view page');
    return redirect('/login');
  }

  try {
    const resp = await customFetch.get('/withdraw?status=sent', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    store.dispatch(addWithdraw(resp.data.withdraw));
    const withdraw = resp.data.withdraw;

    return { withdraw };
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Withdraw = () => {
  return (
    <>
      <Withdrawal />
    </>
  );
};
export default Withdraw;
