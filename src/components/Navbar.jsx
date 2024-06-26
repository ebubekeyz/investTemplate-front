import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import NavLinks from './NavLinks';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../features/user/userSlice';
import { useSelector } from 'react-redux';
import logo from '../assets/logo2.png';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <Link
            to="/"
            className="hidden lg:flex bg-blue-300 shadow py-2 px-4 rounded-xl"
          >
            {' '}
            <div className="stat-title text-primary-content text-xl font-bold tracking-widest">
              Trust Investment
            </div>
          </Link>

          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/* sun icon */}
            <BsSunFill className="swap-on h-4 w-4" />
            {/* moon icon */}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          {/*  */}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
