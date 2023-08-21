import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './loginPage.module.css';
export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        formData
      );

      const token = response.data.token;

      localStorage.setItem('authToken', token);
      navigate('/contacts');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2 className={css.loginHeader}>login</h2>
      <form className={css.loginForm}>
        <label htmlFor="User email" className={css.inputLabelLogin}>
          User e-mail
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className={css.inputLogin}
          />
        </label>
        <label htmlFor="User password" className={css.inputLabelLogin}>
          User password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={css.inputLogin}
          />{' '}
        </label>
        <button type="button" onClick={handleLogin} className={css.loginBtn}>
          Login
        </button>
      </form>
    </div>
  );
};
