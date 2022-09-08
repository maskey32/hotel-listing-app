import { createContext, useState } from "react";

// Roles: regular-user
export const AuthContext = createContext({
  loggedIn: false,
  name: null,
  userId: null,
  token: null,
});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loggedIn: false,
    name: "",
    userId: "",
    token: "",
  });

  const login = ( name, userId, token) => {
    setAuth((prevState) => ({
      ...prevState,
      loggedIn: true,
      name,
      userId,
      token,
    }));
  };

  const logout = () => {
    setAuth((prevState) => ({
      ...prevState,
      loggedIn: false,
      name: "",
      userId: "",
      token: "",
    }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

console.log('--------Provider' + AuthProvider);

export default AuthProvider;