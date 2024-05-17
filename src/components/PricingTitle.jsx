import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PricingTitle = () => {
  const [t, i18n] = useTranslation('global');

  const handleChangeLanguage = (lang = string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    handleChangeLanguage('en');
  }, []);
  return (
    <div className="grid place-items-center max-w-lg mx-auto ">
      <h1 className="text-3xl font-bold capitalize">{t('pricing.header')}</h1>
      <div className="border border-b-1 w-32 border-cyan-500 my-3"></div>
      <p className="text-center mx-auto leading-snug text-md text-gray-400">
        {t('pricing.text')}
      </p>
    </div>
  );
};
export default PricingTitle;
