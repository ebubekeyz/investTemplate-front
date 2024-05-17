import { toast } from 'react-toastify';
import { customFetch, formatPrice } from '../utils';
import { addWithdraw } from '../features/package/packageSlice';
import { FormInput, SubmitBtn } from '../components';
import { Form, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withdrawalQuery = (name, data, token) => {
  return {
    queryKey: ['withdrawal', name],
    queryFn: () =>
      customFetch.post('/withdraw', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  };
};

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const balance = store.getState().packageState.balance;

    if (data.amount > balance) {
      toast.error('Insufficient balance');
      return null;
    }
    if (
      !user.accountNumber ||
      user.accountNumber === '' ||
      !user.accountName ||
      user.accountName === ''
    ) {
      toast.error(
        'You must add your account number before you withdraw. Please go to your settings'
      );
      return null;
    }

    data = {
      ...data,
      accountNumber: user.accountNumber,
      accountName: user.accountName,
    };

    console.log(data);
    try {
      const resp = await queryClient.ensureQueryData(
        withdrawalQuery(user.name, data, user.token)
      );
      toast.success('Withdrawal Successful');

      return redirect('/dashboard');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.resp?.data?.error?.message || 'Something went wrong ';

      toast.error(errorMessage);
      return null;
    }
  };

const Withdrawal = () => {
  const balance = useSelector((state) => state.packageState.balance);

  return (
    <Form method="post" className="align-element my-5">
      <article className="">
        <h1 className="font-medium text-4xl">{formatPrice(Number(balance))}</h1>
      </article>

      <h4 className="text-center text-3xl font-bold">Withdraw</h4>
      <FormInput label="amount" name="amount" />
      <SubmitBtn text="withdraw" />
    </Form>
  );
};
export default Withdrawal;
