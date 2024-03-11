import React, { useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({
  token: "",
  login: () => {},
  logOut: () => {},
});
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token" || null);
  const [token, setToken] = useState(initialToken);

  const loginHandler = (id) => {
    setToken(() => id);
    localStorage.setItem("token", id);
    const data = localStorage.getItem("token");
    console.log("Successfully login", data);
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.clear();
    const data = localStorage.getItem("token");
    console.log("Successfully logOut", data);
  };

  const contextValue = {
    token: token,
    login: loginHandler,
    logOut: logOutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
