import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorElement = () => {
  const nav = useNavigate();

  // useEffect(() => {
  //   setInterval(() => {
  //     nav(0);
  //   }, 5000);
  // }, []);
  return (
    <div className="font-bold text-4xl grid place-items-center h-[50vh]">
      There was an Error...
    </div>
  );
};
export default ErrorElement;
