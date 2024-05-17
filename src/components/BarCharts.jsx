import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';
import { productSales } from '../utils';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { formatPrice } from '../utils';

const BarCharts = () => {
  const packs = useSelector((state) => state.packageState.package);

  const [packet, setPacket] = useState(Object.values(packs));

  return (
    <div className="pb-96 relative mt-10">
      <div className="absolute top-0 left-0 w-full h-full">
        <ResponsiveContainer>
          <BarChart width={500} height={400} data={packet}>
            <YAxis />
            <XAxis dataKey="plan" />
            <CartesianGrid strokeDasharray="5 5" />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              type="monotone"
              stroke="#2563eb"
              fill="#3b82f6"
              dataKey="amount"
              stackId="1"
              margin={{ right: 200 }}
            />
          </BarChart>
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
          Amount:
          <span className="ml-2">{formatPrice(payload[0].value)}</span>
        </p>
      </div>
    );
  }
};
export default BarCharts;
