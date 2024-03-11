import React, { useRef } from "react";

const Profile = () => {
  const nameRef = useRef();
  const urlRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const url = urlRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB-tgeIQueud130Enb5tNTJXT2bO6NI8Ts",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: "",
          displayName: name,
          photoUrl: url,
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
        <input type="text" id="name" name="name" ref={nameRef} />
        <br />
        <br />
        <label htmlFor="url">Profile URL</label>
        <input type="text" id="url" name="url" ref={urlRef} />
        <br />
        <br />
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default Profile;
