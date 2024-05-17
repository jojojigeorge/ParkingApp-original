import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Authcontext = createContext();
const AuthProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({ user: "", token: "" });
  axios.defaults.baseURL = "http://localhost:4001";
  axios.defaults.headers.common["Authorization"] = authDetails.token;
  axios.defaults.headers.common["Content-Type"] = "application/json"
  // "Content-Type": "application/json",
  // console.log("inside Auth.js",authDetails)

  // // axios.defaults.headers.common["Authorization"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4ODYxMTYzNTYwNjU2ZTliN2E2ZGQiLCJpYXQiOjE3MTEwMDU4NzEsImV4cCI6MTcxMTYxMDY3MX0.9-a0HsdqP69qW8sRP1uNdYglPEKZYK6xDkmlFOk1s0I"
  // // axios.defaults.headers.common["Authorization"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZlYjRmZThiN2ZiY2QyNDRhMWVjN2QiLCJpYXQiOjE3MTEyNjkxNjEsImV4cCI6MTcxMTg3Mzk2MX0.UQuymGaZZCywkU295_D5PArSgnSTJLobAzPZa01BT5A"
  
  useEffect(() => {  
    const data = localStorage.getItem("authDetails");   
    if (data) {
      const parseData = JSON.parse(data);     
      setAuthDetails({
        ...authDetails,  
        user: parseData.user,
        token: parseData.token, 
      });
      // axios.defaults.headers.common["Authorization"] = parseData.token;  
      console.log("inside Auth.js",parseData)
    }
  }, []);
  return (<Authcontext.Provider value={[authDetails, setAuthDetails]}>{children}</Authcontext.Provider>)
};
// custom hook
const useAuth = () => useContext(Authcontext);
export { useAuth, AuthProvider };
