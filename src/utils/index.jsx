import axios from 'axios';
import { nanoid } from 'nanoid';

let productionUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:7000/api'
    : 'https://investtemplate.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  const dollarAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format((price / 1).toFixed(2));
  return dollarAmount;
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
