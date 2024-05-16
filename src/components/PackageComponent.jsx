import { useLoaderData } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import PackageList from './PackageList';

const PackageComponent = () => {
  const { packages } = useLoaderData();

  return (
    <>
      <PackageList />
    </>
  );
};
export default PackageComponent;
