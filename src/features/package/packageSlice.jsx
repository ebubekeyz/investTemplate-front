import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import moment from 'moment';
import { customFetch } from '../../utils';
import { loginUser } from '../user/userSlice';

const getPackageFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('package')) || null;
};
const getReferralFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('referral')) || null;
};
const getWithdrawFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('withdraw')) || null;
};

const initialState = {
  package: getPackageFromLocalStorage(),
  balance: 0,
  percentage: 0,
  totalAmount: 0,
  percent: 0,
  days: 0,
  referral: getReferralFromLocalStorage(),
  referralBonus: 0,
  profit: false,
  withdraw: getWithdrawFromLocalStorage(),
  withdrawAmount: 0,
};
export const loadPackage = createAsyncThunk(
  'user/changeStatus',
  async (name, thunkAPI) => {
    const user = thunkAPI.getState().userState.user;
    try {
      const resp = await customFetch.get(
        `/package?status=paid`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      thunkAPI.dispatch(addItem(resp.data.packages));
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

export const loadReferral = createAsyncThunk(
  'user/changeStatus',
  async (name, thunkAPI) => {
    const user = thunkAPI.getState().userState.user;
    try {
      const resp = await customFetch.get(
        `/auth?ref=${user._id}&sort=latest`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      thunkAPI.dispatch(addReferral(resp.data.users));
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

export const loadWithdraw = createAsyncThunk(
  'user/changeStatus',
  async (name, thunkAPI) => {
    const user = thunkAPI.getState().userState.user;
    try {
      const resp = await customFetch.get(`/withdraw`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      thunkAPI.dispatch(addWithdraw(resp.data.withdraw));
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);
export const packageCalculations = createAsyncThunk(
  'user/changeStatus',
  async (name, thunkAPI) => {
    thunkAPI.dispatch(calculatePercentage());
    thunkAPI.dispatch(calculateWithdraw());
    thunkAPI.dispatch(calculateReferral());
  }
);

export const changeStatus = createAsyncThunk(
  'user/changeStatus',
  async (name, thunkAPI) => {
    const user = thunkAPI.getState().userState.user;
    try {
      const resp = await customFetch.patch(
        `/package/${user._id}/editUserPackage`,
        { status: 'expired' },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);
export const changeWithdrawStatus = createAsyncThunk(
  'user/changeStatus',
  async (name, thunkAPI) => {
    const user = thunkAPI.getState().userState.user;
    try {
      const resp = await customFetch.patch(
        `/withdraw/${user._id}/editUserWithdraw`,
        { status: 'expired' },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);
export const updateBalance = createAsyncThunk(
  'user/updateBalance',
  async (name, thunkAPI) => {
    try {
      const user = thunkAPI.getState().userState.user;
      const balance = thunkAPI.getState().packageState.balance;

      const profit = thunkAPI.getState().packageState.profit;

      const resp = await customFetch.patch(
        `/auth/${user._id}`,
        { balance: balance },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      return resp.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const pack = { ...action.payload };

      state.package = pack;

      localStorage.setItem('package', JSON.stringify(pack));
    },
    addWithdraw: (state, action) => {
      const withdraw = { ...action.payload };

      state.package = withdraw;

      localStorage.setItem('withdraw', JSON.stringify(withdraw));
    },
    addReferral: (state, action) => {
      state.referral = action.payload;
      localStorage.setItem('referral', JSON.stringify(state.referral)) || null;
    },
    calculateReferral: (state) => {
      const referral = Object.values(
        JSON.parse(localStorage.getItem('referral'))
      );

      if (referral) {
        referral.forEach((item) => {
          state.referralBonus += Math.ceil((item.balance * 10) / 100);
        });
      } else {
        state.referralBonus = initialState.referralBonus;
      }
    },
    calculateWithdraw: (state) => {
      const withdraw = Object.values(
        JSON.parse(localStorage.getItem('withdraw'))
      );

      if (withdraw) {
        withdraw.forEach((item) => {
          if (item.status === 'sent') {
            state.withdrawAmount += item.amount;
          }
        });
      } else {
        state.withdraw = initialState.withdraw;
      }

      const amount = {
        amount: state.withdrawAmount,
      };
      localStorage.setItem('amount', JSON.stringify(amount));
    },
    calculatePercentage: (state) => {
      const pack =
        Object.values(JSON.parse(localStorage.getItem('package'))) || null;
      const withdrawAmount = JSON.parse(localStorage.getItem('amount'));

      if (pack) {
        pack.forEach((item1) => {
          item1.package.forEach((item2) => {
            state.totalAmount = item1.amount;
            state.percent = item2.percent;

            state.percentage = Math.ceil(
              (state.totalAmount * state.percent) / 100
            );

            const profit =
              moment().format('DD') ==
              moment(item1.updatedAt).add(item2.days, 'days').format('DD');

            if (profit === true) {
              state.balance =
                state.totalAmount +
                state.percentage +
                state.referralBonus -
                withdrawAmount.amount;

              state.profit = true;
            } else {
              state.balance = 0;
              state.profit = false;
            }
          });
        });
      } else {
        state.balance = 0;
        state.percent = 0;
        state.percentage = 0;
        state.days = 0;
        state.totalAmount = 0;
        state.package = [];
        state.referral = [];
      }
    },
    clearPackage: (state) => {
      localStorage.setItem('package', JSON.stringify([]));
      return initialState;
    },
  },
});

export const {
  addItem,
  clearPackage,
  addReferral,
  calculatePercentage,
  calculateReferral,
  addWithdraw,
  calculateWithdraw,
} = packageSlice.actions;

export default packageSlice.reducer;
