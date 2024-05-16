const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'dashboard', text: 'dashboard' },
  { id: 4, url: 'withdraw', text: 'withdraw' },
  { id: 5, url: 'investment', text: 'investment' },
  { id: 6, url: 'settings', text: 'settings' },
  { id: 7, url: 'referrals', text: 'referral' },
];
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if (
          (url === 'dashboard' ||
            url === 'withdraw' ||
            url === 'settings' ||
            url === 'investment' ||
            url === 'referrals') &&
          !user
        )
          return null;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
