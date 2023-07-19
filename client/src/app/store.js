import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import organisationauthReducer from './features/auth/organisationauthSlice'
import adminauthReducer from './features/auth/adminauthSlice'
import chatReducer from './features/user/chat'


const store = configureStore({
  reducer: {
    auth: authReducer,
    organisationauth: organisationauthReducer,
    adminAuth:adminauthReducer,
    messages:chatReducer
  },
});

export default store;