import { Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { Breadcrumb, FormInput, SectionTitle, SubmitBtn } from '../components';
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

    const resp = await customFetch.patch(`/auth/updatePassword`, data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    toast.success('Successful');
    store.dispatch(loginUser(resp.data));
    return redirect('/updatePassword');
  };

const UpdatePassword = () => {
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
        text2="Change Password"
        url2="/UpdatePassword"
      />
      <SectionTitle />
      <FormInput label="Old Password" name="oldPassword" />
      <FormInput label="New Password" name="newPassword" />

      <SubmitBtn text="update password" />
    </Form>
  );
};
export default UpdatePassword;
