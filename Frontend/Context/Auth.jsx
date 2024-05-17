import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext();
const AuthProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({ user: "", token: "" });
  // axios.defaults.baseURL = "http://localhost:4001";
  axios.defaults.baseURL = "https://backend-parkingapp.vercel.app"

  axios.defaults.headers.common["Authorization"] = authDetails.token;
  axios.defaults.headers.common["Content-Type"] = "application/json"
  useEffect(() => {  
    const data = localStorage.getItem("authDetails");   
    if (data) {
      const parseData = JSON.parse(data);     
      setAuthDetails({
        ...authDetails,  
        user: parseData.user,
        token: parseData.token, 
      });
    }
  }, []);
  return (<Authcontext.Provider value={[authDetails, setAuthDetails]}>{children}</Authcontext.Provider>)
};
// custom hook
const useAuth = () => useContext(Authcontext);
export { useAuth, AuthProvider };
