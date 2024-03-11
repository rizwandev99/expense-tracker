import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/AuthContext";

const Profile = () => {
  const [name, setName] = useState();
  const [url, setUrl] = useState();

  const nameRef = useRef();
  const urlRef = useRef();

  const ctx = useContext(AuthContext);

  useEffect(() => {
    console.log("useEffect init token :", ctx.token);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB-tgeIQueud130Enb5tNTJXT2bO6NI8Ts",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Get error of Profile");
        }
      })
      .then((res) => {
        console.log("Get profile response :", res);

        const displayName = res.users[0].displayName;
        setName(() => displayName);
        const photoUrl = res.users[0].photoUrl;
        setUrl(() => photoUrl);
      })
      .catch((err) => console.log(err));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const nameVal = nameRef.current.value;
    const urlVal = urlRef.current.value;

    // setName(() => nameVal);
    // setUrl(() => urlVal);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-tgeIQueud130Enb5tNTJXT2bO6NI8Ts",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          displayName: nameVal,
          photoUrl: urlVal,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error in profile update");
        }
      })
      .then((data) => {
        console.log("Successfully updated Profile", data);
      })
      .catch((err) => {
        console.log("Profile error", err);
      });
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <br />
        <br />
        <h1>Contact details:</h1>
        <br />
        <br />
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          ref={nameRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="url">Profile URL</label>
        <input
          type="text"
          id="url"
          name="url"
          ref={urlRef}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default Profile;
//
