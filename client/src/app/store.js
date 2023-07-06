import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import organisationauthReducer from './features/auth/organisationauthSlice'
import adminauthReducer from './features/auth/adminauthSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    organisationauth: organisationauthReducer,
    adminAuth:adminauthReducer
  },
});

export default store;