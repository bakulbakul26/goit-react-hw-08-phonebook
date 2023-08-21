import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetContacts } from 'redux/contactsSlice';
import css from './userMenu.module.css';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState('');

  const handleLogout = () => {
    const storedToken = localStorage.getItem('authToken');

    fetch('https://connections-api.herokuapp.com/users/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        localStorage.removeItem('authToken');
        dispatch(resetContacts());
        navigate('/login');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    fetch('https://connections-api.herokuapp.com/users/current', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserEmail(data.email);
      })
      .catch(error => {
        console.error('Error fetching user email:', error);
      });
  }, []);

  return (
    <div className={css.userMenu}>
      <p className={css.userEmail}>{userEmail}</p>
      <button className={css.menuBtn} type="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
