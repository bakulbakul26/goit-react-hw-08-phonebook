import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

export default store;
