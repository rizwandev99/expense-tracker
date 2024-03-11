import React, { useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({
  token: "",
});
export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token" || "hi");
  const [token, setToken] = useState(initialToken);

  const loginHandler = (id) => {
    setToken(() => id);
    localStorage.setItem("token", id);
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
