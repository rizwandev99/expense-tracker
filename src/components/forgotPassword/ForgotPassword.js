import React, { useContext, useState } from "react";
import classes from "./ForgotPassword.module.css";
import AuthContext from "../../store/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  //   const ctx = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB-tgeIQueud130Enb5tNTJXT2bO6NI8Ts",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: email,
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
          throw new Error("Password reset failed");
        }
      })
      .then((res) => {
        console.log("Password reset success", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <label htmlFor="email" className={classes.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
        />
        <button type="submit" className={classes.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
