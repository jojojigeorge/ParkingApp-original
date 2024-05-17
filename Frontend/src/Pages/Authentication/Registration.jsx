import React, { useState } from "react";
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from "react-router-dom"//to redirect pages
import Layout from "../../Components/Layout.jsx";

const Registration = () => {
  const navigate=useNavigate()
    const [userdata,setUserData]=useState({name:'',email:'',password:'',phone:'',address:'',question:''})
    const inputHandle=e=>{
        setUserData({...userdata,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          const{email,phone,address,password,name,question}=userdata
          const res=await axios.post('/api/v1/user/register/',{name,email,password,address,phone,question})
          if(res.data.success){
            toast.success(res.data.message)
            navigate('/login')
          }else{
            toast.error(res.data.error)
          }
        } catch (error) {
          console.log(error)  
          toast.error("Something is wrong in registration")
        }
    }
  return (
    <>
    <Layout/>
      <div className="container mt-5 mb-5">
        <div className="card container shadow-lg  " style={{ maxWidth: "30rem" }}>
          <div className="display-5 text-center mt-5 ">Sign Up </div>
          <hr />
          <div className="card-body ">
            <form onSubmit={handleSubmit}>
              <div >
                <label htmlFor="name-reg" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id="name-reg" required name="name" onChange={inputHandle}/>
              </div>
              <div >
                <label htmlFor="email-reg" className="form-label">
                  Email
                </label>
                <input type="text" className="form-control" id="email-reg" required name="email" onChange={inputHandle}/>
              </div>
              <div >
                <label htmlFor="password-reg" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password-reg" required name="password"onChange={inputHandle} />
              </div>
              <div >
                <label htmlFor="name-reg" className="form-label">
                  Phone
                </label>
                <input type="text" className="form-control" id="phone-reg"  required name="phone"onChange={inputHandle} />
              </div>
              <div >
                <label htmlFor="name-reg" className="form-label">
                  Adress
                </label>
                <input type="text" className="form-control" id="adress-reg" required name="address"onChange={inputHandle} />
              </div>
              <div >
                <label htmlFor="name-reg" className="form-label">
                  Question[for password recovery]
                </label>
                <input type="text" className="form-control" id="question-reg" required name="question"onChange={inputHandle} />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
