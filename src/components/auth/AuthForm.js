import React, { useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);

  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();

  const history = useNavigate();

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const confirmPassword = inputConfirmPassword.current.value;

    if (password !== confirmPassword) {
      alert("Password & Confirm Password are not same");
      return;
    }

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-tgeIQueud130Enb5tNTJXT2bO6NI8Ts";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-tgeIQueud130Enb5tNTJXT2bO6NI8Ts";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        // const data = res.json();
        // console.log("Hi", data);
        if (res.ok) {
          history("/welcome");
          return res.json();
        } else {
          throw new Error("Some Error in api");
        }
      })
      .then((data) => {
        console.log("SUCCESSSS", data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  //
  return (
    <section className={classes.section}>
      <form onSubmit={submitHandler}>
        <h1>{isLogin ? "Login" : "Signup"}</h1>
        <div className={classes.formcontrol}>
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" required ref={inputEmail} />
        </div>
        <div className={classes.formcontrol}>
          <label htmlFor="password">password :</label>
          <input
            type="password"
            id="password"
            required
            ref={inputPassword}
            minLength={6}
          />
        </div>
        <div className={classes.formcontrol}>
          <label htmlFor="cpasswrod">Confirm password :</label>
          <input
            type="password"
            id="cpassword"
            required
            ref={inputConfirmPassword}
            minLength={6}
          />
        </div>
        <button type="submit" className={classes.formButton}>
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <div className={classes.already}>
        {isLogin ? "Create new Account" : "Login with existing account"}
        {
          <button type="button" onClick={switchAuthHandler}>
            Click here
          </button>
        }
      </div>
    </section>
  );
};

export default AuthForm;
//
