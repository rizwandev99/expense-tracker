import React, { useContext } from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const Welcome = () => {
  const ctx = useContext(AuthContext);

  const verifyEmail = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-tgeIQueud130Enb5tNTJXT2bO6NI8Ts",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: ctx.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Email verify failed");
        }
      })
      .then((res) => {
        console.log("Verify email data", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={classes.h1}>
        <h1>Welcome to the Expense Tracker!!!</h1>
      </div>

      <div className={classes.main}>
        Your profile is incomplete <NavLink to="/profile">Complete now</NavLink>
      </div>

      <div className={classes.main}>
        Please verify your E-mail{" "}
        <NavLink to="/email" onClick={verifyEmail}>
          verify
        </NavLink>
      </div>
    </>
  );
};

export default Welcome;
