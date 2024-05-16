import { toast } from 'react-toastify';
import { Settings as Set } from '../components';
import { redirect } from 'react-router-dom';

export const loader = (store) => async () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('Please log in to view this page');
    return redirect('/login');
  }
  return null;
};

const Settings = () => {
  return (
    <div>
      <Set />
    </div>
  );
};
export default Settings;
