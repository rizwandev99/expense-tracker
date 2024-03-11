import React, { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({
  token: "",
});
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("hi");

  const loginHandler = (id) => {
    setToken(() => id);
  };
  const contextValue = {
    token: token,
    login: loginHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
