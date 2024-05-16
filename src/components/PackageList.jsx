import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import moment from 'moment';
import { formatPrice } from '../utils';
import { useSelector } from 'react-redux';
import SectionTitle from './SectionTitle';

const PackageList = () => {
  const { meta, packages } = useLoaderData();
  const user = useSelector((state) => state.userState.user);
  const profit = useSelector((state) => state.packageState.profit);

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
              <th>S/N</th>
              <th>Plan</th>
              <th>Amount</th>
              <th className="hidden sm:block">Date</th>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {packages.map((pack) => {
              let {
                _id,
                amount,
                coin,
                package: packs,
                createdAt,
                updatedAt,
                status,
              } = pack;

              let num = 0;
              pack.num = num++;

              const date = day(createdAt).format('MMM Do');
              if (profit === false) {
                status = 'Active';
              } else if (profit === true) {
                status = 'Expired';
              }

              return (
                <tr key={_id}>
                  <td>{num}</td>
                  {packs.map((item) => {
                    return <td>{item.plan}</td>;
                  })}

                  <td>{formatPrice(amount)}</td>

                  <td className="hidden sm:block">{date}</td>
                  {packs.map((item) => {
                    return (
                      <td>
                        {moment(updatedAt).add(item.days, 'days').calendar()}
                      </td>
                    );
                  })}
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
export default PackageList;
