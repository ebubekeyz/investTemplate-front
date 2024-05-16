import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import { formatPrice } from '../utils';
import SectionTitle from './SectionTitle';

const WithdrawList = () => {
  const { withdraw } = useLoaderData();

  let idd = 0;

  return (
    <div className="mt-8">
      <h4 className="mb-4">
        Total withdraw{withdraw.length > 0 ? 's' : ''}: {withdraw.length}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Amount</th>

              <th className="hidden sm:block">Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {withdraw.map((item) => {
              let { _id, amount, status, createdAt } = item;
              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');

              return (
                <tr key={_id}>
                  <td className="capitalize">{formatPrice(amount)}</td>

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
export default WithdrawList;
