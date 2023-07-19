import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export default messageSlice.reducer;
export const { setMessages, clearMessages } = messageSlice.actions;
