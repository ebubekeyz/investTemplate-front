import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

import { formatPrice } from '../utils';

const PackageList = () => {
  const { meta, packages } = useLoaderData();
  const user = useSelector((state) => state.userState.user);
  return (
    <div className="mt-8">
      <h4 className="mb-4">
        Total package{packages.length > 0 ? 's' : ''}: {packages.length}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan</th>
              <th>Amount</th>
              <th className="hidden sm:block">Date</th>
              <th className="hidden sm:block">Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {packages.map((pack) => {
              let {
                _id,
                amount,
                coin,
                package: { plan: plan, percent: percent, days: days },
                createdAt,
                status,
              } = pack;
              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');

              return (
                <tr key={_id}>
                  <td className="capitalize">{user.name}</td>
                  <td>{plan}</td>
                  <td>{formatPrice(amount)}</td>

                  <td className="hidden sm:block">{date}</td>
                  <td></td>
                  <td>{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PackageList;
