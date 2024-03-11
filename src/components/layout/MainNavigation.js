import React, { useContext } from "react";
import classes from "./MainNavigation.module.css";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const MainNavigation = () => {
  const ctx = useContext(AuthContext);

  const logOut = () => {
    ctx.logOut();
  };

  return (
    <nav className={classes.navbar}>
      <h2>md-expense-tracker</h2>
      <ul>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? [classes.isActive] : "")}
          style={{
            color: "white",
            textDecoration: "none",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "blue",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "red",
            marginLeft: "10px",
          }}
          onClick={logOut}
        >
          {" "}
          Log-out{" "}
        </NavLink>
      </ul>
    </nav>
  );
};
// hh
export default MainNavigation;
