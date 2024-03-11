import React from "react";
import classes from "./MainNavigation.module.css";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav className={classes.navbar}>
      <h2>md-expense-tracker</h2>
      <ul>
        <NavLink to="/" activeClassName={classes.activeLink}>
          Home
        </NavLink>
        <NavLink>Products</NavLink>
        <NavLink>About us</NavLink>
      </ul>
    </nav>
  );
};
// hh
export default MainNavigation;
