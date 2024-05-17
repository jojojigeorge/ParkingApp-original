import React, { useRef } from "react";
// import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useAuth } from "../../context/Auth";
import Layout from "../../Components/Layout";
import { useAuth } from "../../../Context/Auth";


function Login() {
  const [authDetails,setAuthDetails] =useAuth()
  const nameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const location =useLocation() 
  // console.log("inside login",location)

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = nameRef.current.value;
    const password = passwordRef.current.value;
    try {
      // console.log('autho------------',axios.defaults.headers.common)
      const res = await axios.post(`/api/v1/user/login`, { email, password });
      if (res.data.success) {
        setAuthDetails({  
          ...authDetails,
          user:res.data.user,
          token:res.data.token
        })
  // axios.defaults.headers.common["Authorization"] = res.data.token;

        localStorage.setItem("authDetails",JSON.stringify(res.data))
        toast.success(res.data.message);  
        navigate('/private/')
      } else {  
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };
  return (
    <>
    <Layout/>
      <div className="container mt-5 ">
        <div className="card container shadow-lg " style={{ maxWidth: "20rem" }}>
          <div className="display-5 text-center mt-4">Login </div>
          <hr />
          <div className="card-body  ">
            <form>
              <div className="mb-">
                <label htmlFor="email-reg" className="form-label">
                  Username
                </label>
                <input type="text" ref={nameRef} className="form-control" placeholder="Enter Username" id="email-reg" name="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password-reg" className="form-label">
                  Password
                </label>
                <input type="password" ref={passwordRef} className="form-control" placeholder="Enter Password" id="password-reg" name="password" />
              </div>

              <div className="text-center ">
                <div className=" "style={{display: 'inline-block',marginRight:'4px'}}>
                <button type="submit" onClick={handleLogin} className=" btn btn-primary">
                  Submit
                </button>
                </div>
                <div style={{display: 'inline-block'}}>
                  <button  type="button" className=" btn btn-primary" onClick={()=>{navigate("/forgotpassword")}}>Forgot Password</button>
                </div>
                  
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
