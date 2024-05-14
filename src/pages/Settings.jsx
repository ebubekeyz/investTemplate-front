import { Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import {
  Breadcrumb,
  FormInput,
  FormSelect,
  SectionTitle,
  SubmitBtn,
} from '../components';
import { loginUser } from '../features/user/userSlice';
import { useSelector } from 'react-redux';

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must log in to view this page');
      return redirect('/login');
    }

    const resp = await customFetch.patch(`/auth/${user._id}`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    toast.success('Successful');
    store.dispatch(loginUser(resp.data));
    return redirect('/settings');
  };

const Settings = () => {
  const user = useSelector((state) => state.userState.user);
  const nav = useNavigate();
  if (!user) {
    toast.warn('You must be logged in to view this page');

    return nav('/login');
  }
  return (
    <Form method="post" className="align-element mt-5">
      <Breadcrumb
        text1="Home"
        url1="/"
        text2="Update Password"
        url2="/updatePassword"
      />
      <SectionTitle />
      <FormInput label="Name" name="name" defaultValue={user.name} />
      <FormInput label="Email" name="email" defaultValue={user.email} />

      <FormSelect
        label="Wallet Name"
        name="accountName"
        list={[user.accountName, 'btc', 'eth', 'usdt', 'tron', 'bnb']}
        size="select-md"
        defaultValue={user.accountName}
      />

      <FormInput
        label="Wallet Address"
        name="accountNumber"
        defaultValue={user.accountNumber}
      />

      <SubmitBtn text="edit" />
    </Form>
  );
};
export default Settings;
