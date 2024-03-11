import React from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  return (
    <div className={classes.main}>
      <div>
        <p>Welcome to the Expense Tracker!!!</p>
      </div>
      <div>
        Your profile is incomplete <NavLink to="/profile">Complete now</NavLink>
      </div>
    </div>
  );
};

export default Welcome;
