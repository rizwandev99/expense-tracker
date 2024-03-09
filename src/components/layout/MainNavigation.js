import React from "react";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav className={classes.navbar}>
      <h2>md-expense-tracker</h2>
      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>About us</li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
