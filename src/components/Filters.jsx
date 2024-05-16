import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import FormRange from '../components/FormRange';
import FormCheckbox from '../components/FormCheckbox';

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { name, date, email, balance } = params;
  return (
    <Form
      method="get"
      className=" rounded-md px-8 py-4 bg-base-200 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center"
    >
      {/* SEARCH */}
      <FormInput type="text" label="Search Name" name="name" size="input-sm" />

      <FormInput
        type="text"
        label="Search Email"
        name="email"
        size="input-sm"
      />

      {/* PRICE */}
      <FormRange
        name="balance"
        label="select balance"
        size="range-sm"
        price={balance}
      />

      <FormInput
        type="date"
        label="date"
        name="date"
        size="input-sm"
        defaultValue={date}
      />

      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/referrals" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};
export default Filters;
