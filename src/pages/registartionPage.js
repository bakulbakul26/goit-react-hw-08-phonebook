import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './registrationPage.module.css';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
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

  const handleRegistration = async () => {
    try {
      const registrationResponse = await axios.post(
        'https://connections-api.herokuapp.com/users/signup',
        formData
      );

      console.log('Registration successful:', registrationResponse.data);
      const token = registrationResponse.data.token;

      localStorage.setItem('authToken', token);
      navigate('/contacts');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2 className={css.registerHeader}>sign up</h2>
      <form className={css.registerForm}>
        <label htmlFor="User name" className={css.inputLabelRegister}>
          User name
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleInputChange}
            className={css.inputRegister}
          />
        </label>
        <label htmlFor="User email" className={css.inputLabelRegister}>
          User e-mail
          <input
            type="email"
            name="email"
            placeholder="Email Adderss"
            value={formData.email}
            onChange={handleInputChange}
            className={css.inputRegister}
          />
        </label>
        <label htmlFor="User password" className={css.inputLabelRegister}>
          User password
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={css.inputRegister}
          />
        </label>

        <button
          type="button"
          onClick={handleRegistration}
          className={css.registerBtn}
        >
          Register
        </button>
      </form>
    </div>
  );
};
