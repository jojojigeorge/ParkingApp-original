import React from 'react';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.jsx";
import { useAuth } from "../../../Context/Auth.jsx";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [authDetails, setAuthDetails] = useAuth();


  // const [authDetails, setAuthDetails] = useState({ user: "", token: "" });
  // axios.defaults.baseURL = "http://localhost:4001";
  // axios.defaults.headers.common["Authorization"] = authDetails?.token;
  // useEffect(() => {
  //   const data = localStorage.getItem("authDetails");
  //   if (data) {
  //     const parseData = JSON.parse(data);
  //     setAuthDetails({
  //       ...authDetails,
  //       user: parseData.user,
  //       token: parseData.token,
  //     });
  //     axios.defaults.headers.common["Authorization"] = parseData.token;
  //   }
  // }, []);
  

  const adminorusercheck=async()=>{
    try {
      var url
      if(authDetails?.user.role==1){
        url='/api/v1/user/admin-auth'
      }else{
        url='/api/v1/user/user-auth'
      }
      const res = await axios.get(`${url}`);
      if (res.data.ok) {
        setOk(true);
      }
    } catch (error) {
      console.log("error in header private");
    }
  }
  const authCheck = async () => {
    try {
      const res = await axios.get("/api/v1/user/admin-auth");
      console.log('authCheck res',res)
      if (res.data.ok) {
        setOk(true);  
      }
    } catch (error) {
      console.log("error in header private");
    }
  };
  useEffect(() => {
    // if (authDetails?.user.role==1){  
    //   authCheck(); 
    // }else{
    //   userCheck()

    // }
    if(authDetails?.token)adminorusercheck()
  }, [authDetails?.token]);

  
  return ok ? <Outlet /> : <Spinner />;//either go to spinner or private route
};

export default PrivateRoute;
