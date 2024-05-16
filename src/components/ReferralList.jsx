import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

import { formatPrice } from '../utils';

const ReferralList = () => {
  const { meta, referral } = useLoaderData();
  return (
    <div className="mt-8">
      <h4 className="mb-4">
        Total referral{referral.length > 0 ? 's' : ''}: {referral.length}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th className="hidden sm:block">Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {referral.map((refer) => {
              let { _id, name, email, balance, status, createdAt } = refer;
              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');
              if (balance === 0) {
                status = 'Inactive';
              } else if (balance > 0) {
                status = 'Active';
              }
              return (
                <tr key={_id}>
                  <td className="capitalize">{name}</td>
                  <td>{email}</td>
                  <td>{formatPrice(balance)}</td>

                  <td className="hidden sm:block">{date}</td>
                  <td
                    className={
                      status === 'Active' ? 'text-green-600' : 'text-rose-500'
                    }
                  >
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ReferralList;
