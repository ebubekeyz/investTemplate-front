import axios from 'axios';
import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

let productionUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:7000/api'
    : 'https://investtemplate.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};
export const list = [
  {
    id: nanoid(),
    image: '/banner-img1.svg',
    link: '/register',
    name: 'Get Started Now',
    color: `h-[70vh] bg-gradient-to-l from-cyan-500 to-blue-500  hover:bg-gradient-to-r`,

    title: 'Welcome to Trexholding',
    quote: 'A completely new approach to investing.',
  },
  {
    id: nanoid(),
    image: '/banner-img2.svg',
    link: '/about',
    name: 'Read more',
    color: `h-[70vh] bg-gradient-to-l from-violet-500 to-fuchsia-500  hover:bg-gradient-to-r`,
    title: 'Create earnings with integrity',
    quote: 'We endorse the expansion of investments in promising innovations.',
  },
];

export const productSales = [
  {
    name: 'Jan',
    product1: 2000,
    product2: 1500,
  },
  {
    name: 'Feb',
    product1: 4000,
    product2: 2200,
  },
  {
    name: 'Mar',
    product1: 3000,
    product2: 2290,
  },
  {
    name: 'Apr',
    product1: 1789,
    product2: 2181,
  },
  {
    name: 'May',
    product1: 1890,
    product2: 2181,
  },
  {
    name: 'Jun',
    product1: 2390,
    product2: 2500,
  },
];
