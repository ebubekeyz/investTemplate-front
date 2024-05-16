import { toast } from 'react-toastify';
import { Pay as Payment } from '../components';
import { redirect } from 'react-router-dom';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('Please log in to view this page');
    return redirect('/login');
  }
  return null;
};

const Pay = () => {
  return (
    <div>
      <Payment />
    </div>
  );
};
export default Pay;
