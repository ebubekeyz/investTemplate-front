import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/package/packageSlice';
import { useSelector } from 'react-redux';
import { LuBadgeCheck } from 'react-icons/lu';
import { FaCheck, FaIdBadge } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const packed = useSelector((state) => state.packageState.package);

  const pack = [
    {
      id: nanoid(),
      identity: 'plan1',
      plan: 'T-H1 Plan',
      amount: 50,
      max: 3000,
      percent: 5,
      duration: 24,
      days: 1,
      badge: 'text-5xl text-cyan-400',
      handle: (plan, amount, max, percent, days) => {
        const pack = {
          plan: plan,
          amount: amount,
          max: max,
          percent: percent,
          days: days,
        };

        dispatch(addItem(pack));
        nav('/pay');
      },
      color:
        'h-[27.5rem] w-[95%] rounded-xl grid place-items-center shadow-lg card hover:scale-110 transition duration-200 py-8',
    },
    {
      id: nanoid(),
      identity: 'plan2',
      plan: 'T-H2 Plan',
      amount: 3100,
      max: 7000,
      duration: '2 Days',
      percent: 12,
      days: 2,
      badge: 'text-5xl text-gray-700',
      handle: (plan, amount, max, percent, days) => {
        const pack = {
          plan: plan,
          amount: amount,
          max: max,
          percent: percent,
          days: days,
        };

        dispatch(addItem(pack));
        nav('/pay');
      },
      color:
        'h-[30rem] w-[95%] rounded-xl grid bg-cyan-500 place-items-center shadow-lg card hover:scale-110 transition duration-200 py-8',
    },
    {
      id: nanoid(),
      identity: 'plan3',
      plan: 'T-H3 Plan',
      amount: 7100,
      max: 20000,
      percent: 18,
      duration: '72Hrs',
      days: 3,
      badge: 'text-5xl text-cyan-400',
      handle: (plan, amount, max, percent, days) => {
        const pack = {
          plan: plan,
          amount: amount,
          max: max,
          percent: percent,
          days: days,
        };

        dispatch(addItem(pack));
        nav('/pay');
      },
      color:
        'h-[27.5rem] w-[95%] rounded-xl grid place-items-center shadow-lg card hover:scale-110 transition duration-200 py-8',
    },
    {
      id: nanoid(),
      identity: 'plan4',
      plan: 'T-H4 Plan',
      amount: 20500,
      max: 40000,
      percent: 24,
      durtion: '96Hrs',
      days: 4,
      badge: 'text-5xl text-cyan-400',
      handle: (plan, amount, max, percent, days) => {
        const pack = {
          plan: plan,
          amount: amount,
          max: max,
          percent: percent,
          days: days,
        };

        dispatch(addItem(pack));
        nav('/pay');
      },
      color:
        'h-[27.5rem] w-[95%] rounded-xl grid place-items-center shadow-lg card hover:scale-110 transition duration-200 py-8',
    },
    {
      id: nanoid(),
      identity: 'plan5',
      plan: 'T-H STAKE1 Plan',
      amount: 41000,
      max: 95000,
      percent: 7,
      days: 1,
      badge: 'text-5xl text-gray-700',
      handle: (plan, amount, max, percent, days) => {
        const pack = {
          plan: plan,
          amount: amount,
          max: max,
          percent: percent,
          days: days,
        };

        dispatch(addItem(pack));
        nav('/pay');
      },
      color:
        'h-[30rem] w-[95%] rounded-xl bg-cyan-500 grid place-items-center shadow-lg card hover:scale-110 transition duration-200 py-8',
    },
    {
      id: nanoid(),
      identity: 'plan6',
      plan: 'T-H STAKE2 Plan',
      amount: 91000,
      max: 200000,
      percent: 9.5,
      days: 1,
      badge: 'text-5xl text-cyan-400',
      handle: (plan, amount, max, percent, days) => {
        const pack = {
          plan: plan,
          amount: amount,
          max: max,
          percent: percent,
          days: days,
        };

        dispatch(addItem(pack));
        nav('/pay');
      },
      color:
        'h-[27.5rem] w-[95%] rounded-xl grid place-items-center shadow-lg card hover:scale-110 transition duration-200 py-8',
    },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-10 place-items-center my-8">
      {pack.map((pac) => {
        const {
          id,
          plan,
          amount,
          max,
          percent,
          days,
          handle,
          color,
          identity,
          badge,
          duration,
        } = pac;
        return (
          <div className={color} key={id} id={identity}>
            <h1 className="font-medium text-3xl tracking-tight leading-loose">
              {plan}
            </h1>

            <div>
              <sup className="text-xl font-medium">€</sup>
              <span className="text-4xl font-medium ">{amount}</span>
              <span className="text-xl text-slate-300 font-medium">Min</span>
            </div>
            <LuBadgeCheck className={badge} />

            <span className="">Easy to use</span>

            <span className="">{percent}% ROI Daily</span>

            <span className="">€{max} Maximum</span>

            <span className="">{duration ? `Duration: ${duration}` : ''}</span>

            <button
              type="button"
              className="btn btn-outline border-t-cyan-400 border-b-yellow-400"
              onClick={() => handle(plan, amount, max, percent, days)}
            >
              Invest now
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Pricing;
