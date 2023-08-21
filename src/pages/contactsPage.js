import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import AddContact from 'components/addcontact/addContact';
import UserMenu from 'components/usermenu/UserMenu';

const ContactsPage = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('storedToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch('https://connections-api.herokuapp.com/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Fetched contacts:', data.contacts);
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
        });
    }
  }, [token]);

  return (
    <Provider store={store}>
      <UserMenu />
      <AddContact />
    </Provider>
  );
};

export default ContactsPage;
