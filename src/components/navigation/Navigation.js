import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './navigation.module.css';

const Navigation = () => {
  return (
    <nav className={css.container}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink className={css.navLink} to="/register">
            Register
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink className={css.navLink} to="/login">
            Login
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink className={css.navLink} to="/contacts">
            Contacts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
