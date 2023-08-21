import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import axios from 'axios';
import Notiflix from 'notiflix';

const API_URL = 'https://connections-api.herokuapp.com/contacts';

const getToken = () => {
  return localStorage.getItem('authToken');
};

export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts from API:', error);
      throw error;
    }
  }
);

export const saveContact = createAsyncThunk(
  'contact/saveContact',
  async contact => {
    try {
      const token = getToken();
      const response = await axios.post(API_URL, contact, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error saving contact to API:', error);
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.delete(`${API_URL}/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        return contactId;
      } else {
        throw new Error(`Failed to delete contact with ID: ${contactId}`);
      }
    } catch (error) {
      console.error('Error deleting contact from API:', error);
      throw error;
    }
  }
);

export const resetContacts = createAction('contact/resetContacts');
export const updateContact = createAction('contact/updateContact');

const contactSlice = createSlice({
  name: 'contact',
  initialState: [],
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(saveContact.fulfilled, (state, action) => {
        const newContact = action.payload;
        const existedContact = state.some(
          contact =>
            contact.name === newContact.name &&
            contact.number === newContact.number
        );
        if (!existedContact) {
          state.push({ ...newContact, id: nanoid() });
          Notiflix.Notify.success('Contact saved successfully');
        } else {
          Notiflix.Notify.warning('Contact already exists');
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const contactId = action.payload;
        return state.filter(contact => contact.id !== contactId);
      })
      .addCase(fetchContacts.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(resetContacts, state => {
        return [];
      })
      .addCase(updateContact, (state, action) => {
        const updatedContact = action.payload;
        const contactIndex = state.findIndex(
          contact => contact.id === updatedContact.id
        );

        if (contactIndex !== -1) {
          state[contactIndex] = updatedContact;
          Notiflix.Notify.success('Contact edited successfully');
        }
      });
  },
});

export default contactSlice.reducer;
