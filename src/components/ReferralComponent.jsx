import { useLoaderData } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import ReferralList from './ReferralList';

const ReferralComponent = () => {
  const { referral } = useLoaderData();

  return (
    <>
      <ReferralList />
    </>
  );
};
export default ReferralComponent;
