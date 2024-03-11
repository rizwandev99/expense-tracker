import React, { useContext, useRef, useState } from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const Welcome = () => {
  const ctx = useContext(AuthContext);

  const [category, setCategory] = useState("");
  const [money, setMoney] = useState();
  const [description, setDescription] = useState();

  const moneyInputRef = useRef();
  const descriptionInputRef = useRef();

  let expCategory;
  const handleChange = (event) => {
    expCategory = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const moneyRef = moneyInputRef.current.value;
    const descriptionRef = descriptionInputRef.current.value;

    setMoney(() => moneyRef);
    setDescription(() => descriptionRef);
    setCategory(() => expCategory);
  };

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
        <h4>Welcome to the Expense Tracker!!!</h4>
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
      <hr />
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="money">Enter money:</label>
        <input type="number" id="money" ref={moneyInputRef} />
        <br />
        <br />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" ref={descriptionInputRef} />
        <br />
        <br />
        <label>
          Category:
          <select value={expCategory} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <div>
        <br />
        <h3>Below are your enterd Expense:</h3>
        <br />
        <h4>Money : {money}</h4>
        <h4>Description : {description}</h4>
        <h4>Category : {category}</h4>
      </div>
    </>
  );
};

export default Welcome;
