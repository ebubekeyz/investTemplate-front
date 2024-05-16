import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus } from '../features/package/packageSlice';
import Modal from './Modal';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const DashboardCol1 = () => {
  const balance = useSelector((state) => state.packageState.balance);
  const profit = useSelector((state) => state.packageState.profit);

  const [prof, setProf] = useState(profit);

  const dispatch = useDispatch();

  const handleUpgrade = () => {
    dispatch(changeStatus());
  };

  return (
    <section className="mt-5 pr-4">
      <article className="flex justify-between ">
        <h1 className="font-medium tracking-wide capitalize text-lg">
          Balance
        </h1>
        <Link
          to="/pricing"
          onClick={handleUpgrade}
          className="btn btn-xs btn-outline border-l-cyan-400 border-r-cyan-300"
        >
          Upgrade Plan
        </Link>
      </article>

      <article className="">
        <h1 className="font-medium text-4xl">{formatPrice(Number(balance))}</h1>
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
              Heading
            </h1>
            <p className="text-center leading-loose max-w-[30rem] text-gray-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              est. Inventore perferendis quisquam excepturi blanditiis nemo,
              facere consequatur minus esse!
            </p>
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
