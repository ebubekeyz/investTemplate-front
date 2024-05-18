import { useSelector } from 'react-redux';
import { formatPrice } from '../utils';
import { Link } from 'react-router-dom';
import LineCharts from './LineCharts';
import { useState } from 'react';
import moment from 'moment';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

const DashboardCol2 = () => {
  const referralBonus = useSelector(
    (state) => state.packageState.referralBonus
  );
  const referral = useSelector((state) => state.packageState.referral);
  const user = useSelector((state) => state.userState.user);
  const [referrals, setReferrals] = useState(Object.values(referral));
  const [copyID, setCopyID] = useState(user._id);

  const copyHandler = () => {
    copy(copyID);
    toast.success(`You have copied ${copyID}`);
  };
  return (
    <div className="mt-3 pl-4">
      <article className="flex justify-between">
        <h1 className="font-medium tracking-wide capitalize text-lg">
          Referral Balance
        </h1>
      </article>

      <article className="flex justify-between">
        <h1 className="font-medium text-3xl">
          {formatPrice(Number(referralBonus))}
        </h1>
      </article>

      <Link
        to="/referrals"
        className="btn btn-xs btn-outline border-l-cyan-400 border-r-cyan-300 mt-8"
      >
        Referral Log
      </Link>

      <h1 className="font-medium tracking-wide capitalize text-xl mt-10 border-b border-b-base-200 pb-5">
        Referral Chart
      </h1>

      <article className="mt-10">
        <LineCharts />

        <div className="flex-col lg:flex gap-5">
          {Object.values(referrals).map((item) => {
            const { createdAt } = item;
            return (
              <div className="flex gap-x-5 items-center">
                <span className="text-orange-600">Joined:</span>
                <div className="rounded-full bg-green-600 h-3 w-3"></div>
                {moment(createdAt).calendar()}
              </div>
            );
          })}
        </div>

        <article className="flex-col lg:flex lg:justify-between mt-12 border-b border-b-base-200 pb-5">
          <h1 className="font-medium tracking-wide capitalize text-lg">
            Referral ID
          </h1>

          <div className="bg-base-200 px-5 rounded-xl mt-5">{copyID}</div>
        </article>

        <div className="flex justify-end">
          <button
            onClick={copyHandler}
            className="btn btn-xs btn-outline border-l-cyan-400 border-r-cyan-300 mt-5"
          >
            copy Referral ID
          </button>
        </div>
      </article>
    </div>
  );
};
export default DashboardCol2;
