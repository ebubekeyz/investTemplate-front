import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { addWithdraw } from '../features/package/packageSlice';
import { FormInput, SubmitBtn } from '../components';
import { Form, redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const user = store.getState().userState.user;

    try {
      const resp = await customFetch.post('/withdraw', data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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
  const withdraw = useSelector((state) => state.packageState.withdraw);

  return (
    <Form method="post" className="align-element my-5">
      <h4 className="text-center text-3xl font-bold">Withdraw</h4>
      <FormInput label="amount" name="amount" />
      <SubmitBtn text="withdraw" />
    </Form>
  );
};
export default Withdrawal;
