import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

const getActiveLinkClassName = (isActive: boolean) => (isActive ? 'header__link header__link--active' : 'header__link');

const Header = () => (
  <header>
    <nav className="header__navigation">
      <NavLink
        className={({ isActive }) => getActiveLinkClassName(isActive)}
        to="/characters"
      >
        Characters
      </NavLink>
      <NavLink
        className={({ isActive }) => getActiveLinkClassName(isActive)}
        to="/episodes"
      >
        Episodes
      </NavLink>
      <NavLink
        className={({ isActive }) => getActiveLinkClassName(isActive)}
        to="/locations"
      >
        Locations
      </NavLink>
    </nav>
  </header>
);

export default Header;
