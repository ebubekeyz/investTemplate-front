import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';

import moment from 'moment';

import { useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const LineCharts = () => {
  const referral = useSelector((state) => state.packageState.referral);
  const [referrals, setReferrals] = useState(Object.values(referral));

  return (
    <div className="pb-96 relative h-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <ResponsiveContainer width="90%">
          <LineChart width={500} height={400} data={referrals}>
            <YAxis />
            <XAxis dataKey="name" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              stroke="#2563eb"
              fill="#3b82f6"
              dataKey="balance"
              stackId="1"
              margin={{ right: 200 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Balance:
          <span className="ml-2">{formatPrice(payload[0].value)}</span>
        </p>
      </div>
    );
  }
};
export default LineCharts;
