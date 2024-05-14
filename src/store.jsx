import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import packageReducer from './features/package/packageSlice';

export const store = configureStore({
  reducer: {
    userState: userReducer,
    packageState: packageReducer,
  },
});
