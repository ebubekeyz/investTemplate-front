import { toast } from 'react-toastify';
import { UpdatePassword as Update } from '../components';
import { redirect } from 'react-router-dom';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('Please log in to view this page');
    return redirect('/login');
  }
  return null;
};

const UpdatePassword = () => {
  return (
    <div>
      <Update />
    </div>
  );
};
export default UpdatePassword;
