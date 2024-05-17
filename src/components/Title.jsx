import { useTranslation } from 'react-i18next';

const Title = ({ title, description }) => {
  const [t, i18n] = useTranslation('global');
  return (
    <div className="grid place-items-center max-w-lg mx-auto ">
      <h1 className="text-3xl font-bold capitalize">{title}</h1>
      <div className="border border-b-1 w-32 border-cyan-500 my-3"></div>
      <p className="text-center mx-auto leading-snug text-md text-gray-400">
        {description}
      </p>
    </div>
  );
};
export default Title;
