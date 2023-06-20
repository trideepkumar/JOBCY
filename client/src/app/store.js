import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import organisationauthReducer from './features/auth/organisationauthSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    organisationauth: organisationauthReducer
  },
});

export default store;