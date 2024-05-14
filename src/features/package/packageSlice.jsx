import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const getPackageFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('package')) || null;
};

const initialState = {
  package: getPackageFromLocalStorage(),
};

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const pack = { ...action.payload };
      state.package = pack;

      localStorage.setItem('package', JSON.stringify(pack));
    },
    clearPackage: (state) => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
  },
});

export const { addItem } = packageSlice.actions;

export default packageSlice.reducer;
