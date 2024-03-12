import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

const Welcome = () => {
  const ctx = useContext(AuthContext);

  const [category, setCategory] = useState("");
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState();

  const moneyInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  // let expCategory;
  // const handleChange = (event) => {
  //   expCategory = event.target.value;
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const moneyRef = moneyInputRef.current.value;
    const descriptionRef = descriptionInputRef.current.value;
    const categoryRef = categoryInputRef.current.value;

    await setMoney(moneyRef);
    await setDescription(descriptionRef);
    await setCategory(categoryRef);

    console.log("Hi", category, money, description);

    setData((prevData) => {
      var randomKey = Math.random().toString(36).substring(2);

      let item = {
        ...prevData,
        [randomKey]: {
          money: money,
          description: description,
          category: category,
        },
      };
      return item;
    });

    fetch(
      "https://expense-tracker-d62f0-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify({
          money: money,
          description: description,
          category: category,
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
        console.log("Expense successfully added", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(
      "https://expense-tracker-d62f0-default-rtdb.firebaseio.com/expense/.json"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Email verify failed");
        }
      })
      .then((res) => {
        console.log(" Get Expense successfully ", res);
        setData(() => res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <hr />
      <div className={classes.main}>
        Your profile is incomplete <NavLink to="/profile">Complete now</NavLink>
      </div>
      <hr />
      <div className={classes.main}>
        Please verify your E-mail{" "}
        <NavLink to="/email" onClick={verifyEmail}>
          verify
        </NavLink>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="money">Enter money : </label>
        <input type="number" id="money" ref={moneyInputRef} />
        <br />
        <br />
        <label htmlFor="description">Description : </label>
        <input type="text" id="description" ref={descriptionInputRef} />
        <br />
        <br />
        <label>
          Category :{/* <select value={expCategory} onChange={handleChange}> */}
          <select ref={categoryInputRef}>
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
        {data &&
          Object.keys(data).map((key) => {
            const item = data[key];
            return (
              <div key={key}>
                <h4>Money : {item.money}</h4>
                <h4>Description : {item.description}</h4>
                <h4>Category : {item.category}</h4>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Welcome;
