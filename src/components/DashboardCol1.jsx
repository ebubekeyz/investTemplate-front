import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus } from '../features/package/packageSlice';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { changeWithdrawStatus } from '../features/package/packageSlice';
import BarCharts from './BarCharts';
import moment from 'moment';
import PieCharts from './PieCharts';

const DashboardCol1 = () => {
  const balance = useSelector((state) => state.packageState.balance);
  const profit = useSelector((state) => state.packageState.profit);
  const packs = useSelector((state) => state.packageState.package);
  const withdraw = useSelector((state) => state.packageState.withdraw);
  const withdrawAmount = useSelector(
    (state) => state.packageState.withdrawAmount
  );

  const [prof, setProf] = useState(profit);

  const dispatch = useDispatch();

  const handleUpgrade = () => {
    dispatch(changeStatus());
    dispatch(changeWithdrawStatus());
  };

  return (
    <section className="mt-5 pr-4">
      <article className="flex justify-between ">
        <h1 className="font-medium tracking-wide capitalize text-lg">
          Account Balance
        </h1>

        {profit === true ? (
          <Link to="/withdraw" className="btn btn-xs btn-success animate-pulse">
            Withdraw
          </Link>
        ) : (
          ''
        )}
      </article>
      <article className="">
        <h1 className="font-medium text-4xl">{formatPrice(Number(balance))}</h1>
      </article>

      <div className="flex gap-x-2 mt-10">
        <Link
          to="/pricing"
          className="btn btn-xs btn-outline border-l-cyan-400 border-r-cyan-300"
        >
          Invest
        </Link>
        <Link
          to="/pricing"
          onClick={handleUpgrade}
          className="btn btn-xs btn-outline border-l-cyan-400 border-r-cyan-300"
        >
          Upgrade Plan
        </Link>
        <Link
          to="/investment"
          className="btn btn-xs btn-outline border-l-rose-600 border-r-rose-500"
        >
          Investment Log
        </Link>
      </div>
      <h1 className="font-medium tracking-wide capitalize text-xl mt-5 border-b border-b-base-200 pb-5">
        Investment Chart
      </h1>
      <article>
        <BarCharts />

        <div className="lg:flex flex-col gap-5">
          {Object.values(packs).map((item) => {
            const { updatedAt } = item;
            return (
              <div>
                {item.package.map((item2) => {
                  const { days } = item2;
                  return (
                    <div className="flex items-center gap-x-5">
                      <span className="text-red-400">Exp:</span>
                      <div className="rounded-full bg-green-600 h-3 w-3"></div>
                      {moment(updatedAt).add(days, 'days').calendar()}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </article>
      <article className="my-20">
        <article className="">
          <h1 className="font-medium tracking-wide capitalize text-lg">
            Total Withdrawal Balance
          </h1>
          <h1 className="font-medium text-3xl">
            {formatPrice(Number(withdrawAmount))}
          </h1>

          <Link
            to="/withdrawList"
            className="btn btn-xs btn-outline border-l-lime-400 border-r-lime-300 my-5"
          >
            Withdraw Log
          </Link>
          <h1 className="font-medium tracking-wide capitalize text-xl border-b border-b-base-200 pb-5">
            Withdrawal Chart
          </h1>
        </article>
        <PieCharts />

        <div className="flex-col lg:flex gap-5 flex:col">
          {Object.values(withdraw).map((item) => {
            const { updatedAt } = item;
            return (
              <div className="flex gap-x-5 items-center">
                <span className="text-pink-500">Date:</span>
                <div className="rounded-full bg-green-600 h-3 w-3"></div>
                {moment(updatedAt).calendar()}
              </div>
            );
          })}
        </div>
      </article>
      {prof && (
        <div className="p-12 grid place-items-center bg-emerald-600 bg-opacity-10 absolute top-0 left-0 bottom-0 right-0 z-10">
          <div className="rounded-xl shadow-lg bg-slate-200 px-14 py-10 transition duration-200">
            <div className="text-right flex justify-end">
              <FaTimes
                className="text-orange-950 cursor-pointer"
                onClick={() => {
                  setProf(false);
                }}
              />
            </div>
            <h1 className="text-2xl text-gray-950 tracking-wide text-center">
              <span className="font-medium">Congratulations!!.</span> You have
              Earned{' '}
              <span className="font-medium text-2xl">
                {formatPrice(profit)}
              </span>
            </h1>
            <h2 className="text-2xl text-gray-950 tracking-wide text-center">
              Your account balance is &nbsp;
              <span className="font-medium text-3xl">
                {formatPrice(balance)}
              </span>
            </h2>
            <img src="/celebrate.svg" alt="happy" />
            <div className="flex justify-between pt-5">
              <Link to="/withdraw" className="btn btn-info btn-sm">
                Withdraw
              </Link>
              <Link to="" className="btn btn-success btn-sm">
                Reinvest
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default DashboardCol1;
