import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { addItem } from '../features/package/packageSlice';
import {
  Breadcrumb,
  FormInput,
  FormInputFile,
  FormSelect,
  SectionTitle,
  SubmitBtn,
} from '../components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';

export const action =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const pack = store.getState().packageState.package;

    if (!user) {
      toast.warn('You must be logged in to view this page');
      return redirect('/login');
    }

    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    const formData2 = new FormData();

    formData2.append('image', data.receipt);
    console.log(data.receipt);

    const response = await customFetch.post('/upload', formData2);

    let receipt = response.data.image.src;

    let originUrl =
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:4000'
        : 'https://comfi-server-api.onrender.com';

    receipt = `${originUrl}${receipt}`;

    if (data.amount < pack.amount) {
      toast.error('Wrong Amount Selected');
      return null;
    }
    if (data.amount > pack.max) {
      toast.error('Wrong Amount Selected');
      return null;
    }
    data = { ...data, amount: data.amount, package: pack, receipt: receipt };
    console.log(data);

    const resp = await customFetch.post('/package', data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    toast.success('payment successfully made');
    console.log(resp.data.attributes);
    store.dispatch(addItem(resp.data.attributes));
    window.location.reload();

    return null;
  };

const Pay = () => {
  const user = useSelector((state) => state.userState.user);
  const nav = useNavigate();
  if (!user) {
    toast.warn('You must be logged in to view this page');

    return nav('/login');
  }
  const [copyText, setCopyText] = useState({
    btc: '',
    eth: '',
    usdt: '',
    tron: '',
    bnb: '',
  });
  const showWallet = async () => {
    const resp = await customFetch.get('/wallet/allWallet');

    const num = resp.data.wallet.length - 1;
    const wallet = resp.data.wallet[num];

    localStorage.setItem('wallet', JSON.stringify(wallet));

    const walletAddress = JSON.parse(localStorage.getItem('wallet'));

    const { btc, eth, usdt, tron, bnb } = walletAddress;
    setCopyText({
      btc: btc,
      eth: eth,
      usdt: usdt,
      tron: tron,
      bnb: bnb,
    });
  };
  useEffect(() => {
    showWallet();
  }, [showWallet]);

  const submit1 = () => {
    copy(copyText.btc);
    toast.success(`You have copied ${copyText.btc}`);
  };
  const submit2 = () => {
    copy(copyText.eth);
    toast.success(`You have copied ${copyText.eth}`);
  };

  const submit3 = () => {
    copy(copyText.tron);
    toast.success(`You have copied ${copyText.tron}`);
  };

  const submit4 = () => {
    copy(copyText.usdt);
    toast.success(`You have copied ${copyText.usdt}`);
  };

  const submit5 = (coin) => {
    copy(copyText.bnb);
    toast.success(`You have copied ${copyText.bnb}`);
  };

  return (
    <section className="align-element my-8">
      <Breadcrumb text1="Home" url1="/" text2="Pay" url2="/pay" />
      <SectionTitle />
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 mt-4">
        <Form
          method="post"
          encType="multipart/form-data"
          className="lg:col-span-7 mb-14"
        >
          <FormInput type="text" name="amount" label="amount" />

          <FormSelect
            label="coin"
            name="coin"
            list={['', 'btc', 'eth', 'usdt', 'tron', 'bnb']}
            size="select-md"
          />

          <FormInputFile type="file" name="receipt" label="receipt" />
          <div className="mt-4">
            <SubmitBtn text="submit" />
          </div>
        </Form>

        <div className="col-span-5">
          <div>
            <p className="mt-2 uppercase text-md font-medium">btc</p>
            <p className="rounded-md p-2 px-4 my-4 bg-gray-600 text-slate-100">
              {copyText.btc}
            </p>
            <button
              onClick={submit1}
              type="button"
              className="btn btn-md btn-outline border-l-cyan-400 border-t-cyan-400 w-full"
            >
              Copy
            </button>
          </div>

          <div className="">
            <p className="mt-4 uppercase text-md font-medium">eth</p>
            <p className="rounded-md p-2 my-4 bg-gray-600 text-slate-100">
              {copyText.eth}
            </p>
            <button
              onClick={submit2}
              type="button"
              className="btn btn-md btn-outline border-l-cyan-400 border-t-cyan-400 w-full"
            >
              Copy
            </button>
          </div>

          <div className="">
            <p className="mt-4 uppercase text-md font-medium">tron</p>
            <p className="rounded-md p-2 my-4 bg-gray-600 text-slate-100">
              {copyText.tron}
            </p>
            <button
              onClick={submit3}
              type="button"
              className="btn btn-md btn-outline border-l-cyan-400 border-t-cyan-400 w-full"
            >
              Copy
            </button>
          </div>

          <div className="">
            <p className="mt-4 uppercase text-md font-medium">usdt</p>
            <p className="rounded-md p-2 my-4 bg-gray-600 text-slate-100">
              {copyText.usdt}
            </p>
            <button
              onClick={submit4}
              type="button"
              className="btn btn-md btn-outline border-l-cyan-400 border-t-cyan-400 w-full"
            >
              Copy
            </button>
          </div>

          <div className="">
            <p className="mt-4 uppercase text-md font-medium">bnb</p>
            <p className="rounded-md p-2 my-4 bg-gray-600 text-slate-100">
              {copyText.bnb}
            </p>
            <button
              onClick={submit5}
              type="button"
              className="btn btn-md btn-outline border-l-cyan-400 border-t-cyan-400 w-full"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Pay;
