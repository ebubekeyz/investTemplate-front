import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Navbar, Loading } from '../components';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? <Loading /> : <Outlet />}
    </>
  );
};
export default HomeLayout;
