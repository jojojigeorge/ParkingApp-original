import Layout from "../Components/Layout";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; //to redirect pages
import { useSearch } from "../../Context/Search";   
import { Select } from "antd";
import moment from "moment";
const { Option } = Select;

const DisplayDetails = () => {  
    const navigate = useNavigate();
  const [searchvalue, setSearchValue] = useSearch();
  const [userdata, setUserData] = useState({ owner: "", paidfor: "", phone: "", address: "", vehicle_no: searchvalue } ); 
  const parms = useParams();
  // get single vehicle details
  const getSingleVehicle = async () => {    
    try {
        const {data}=await axios.get(`/api/v1/vehicle/single-vehicle/${parms.vid}`)
        setUserData(data.singlevehicle)
    } catch (error) {
       console.log('error in get single vehicle',error) 
    }
  };
  // plan details
  const [selectedstatus, setSelectedstatus] = useState([
    { name: "Not paid", day: 0 },
    { name: "1-day-₹10", day: 1 },
    { name: "7-day-₹50", day: 7 },
    { name: "30-day-₹200", day: 30 },
  ]);

  
  // const [userdata, setUserData] = useState({ owner: "", vehicle_no: "", paidfor: "", phone: "", address: "" });

  // add searched vehicle no to add vehicle details form
  const inputHandle = (e) => {
    console.log(e.target);
    setUserData({ ...userdata, [e.target.name]: e.target.value });
    console.log(userdata);
  };
  //  add vehicle button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { owner, phone, address, paidfor, vehicle_no } = userdata;
      const res = await axios.post("/api/v1/vehicle/add-vehicle/", { address, phone, owner, vehicle_no, paidfor });
      if (res.data.success) {
        toast.success(res.data.message);
        setUserData({ owner: "", vehicle_no: "", paidfor: "", phone: "", address: "" });
        navigate("/viewallvehicle");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong in registration");
    }
  };
   // on click complete edit
   const handleEdit = async (e, orderId) => {
    try {
      e.preventDefault()
        const { phone, owner, vehicle_no, address,  paidfor } = userdata
      const { data } = await axios.put(`/api/v1/vehicle/editall-vehicle/${userdata._id}`, { phone,owner,vehicle_no,address,paidfor});
      // getAllvehicleDetails();
      console.log('data',data)
      toast.success('update vehicle details')
      navigate( "/private")
    } catch (error) {
      console.log("error in order staus update", error);
    }
  };
  useEffect(() => {
    getSingleVehicle();
  }, []);
  return (
    <>
      <Layout />
      <div className="container mt-5 mb-5">
        <div className="card container shadow-lg  " style={{ maxWidth: "35rem" }}>
          <div className="display-6 text-center mt-5 ">Vehicle Details</div>
          <hr />
          <div className="card-body ">
            <form onSubmit={handleEdit}>
              <div>
                <label htmlFor="name-reg" className="form-label">
                  Vehicle No:
                </label>
                <input type="text" required className="form-control" id="name-reg" value={userdata.vehicle_no} name="vehicle_no" onChange={(e) => setUserData({ ...userdata, vehicle_no: e.target.value.trim() })} />
              </div>
              {userdata.backlog&&<div>
                <label htmlFor="email-reg" className="form-label">
                  Check in:
                </label>
                <input type="text" className="form-control" id="email-reg" placeholder={moment(userdata.backlog).fromNow()}  />
              </div>}
              <div>
                <label htmlFor="name-reg" className="form-label">
                  Plan :
                </label>
                <div className="lh-5">
                  <Select size="large" className="w-100 h-69" name="plan" value={userdata.paidfor} onChange={(e) => setUserData({ ...userdata, paidfor: e })}>
                    {selectedstatus?.map((st, i) => (
                      <Option value={st.day} key={i}>
                        {st.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                {/* <input type="number" className="form-control" id="adress-reg" value={userdata.paidfor} name="paidfor" onChange={inputHandle} /> */}
              </div>
              <div>
                <label htmlFor="email-reg" className="form-label">
                  Phone:
                </label>
                <input type="text" className="form-control" id="email-reg" value={userdata.phone} name="phone" onChange={inputHandle} />
              </div>
              <div>
                <label htmlFor="password-reg" className="form-label">
                  Vehicle Owner:
                </label>
                <input type="text" className="form-control" id="password-reg" value={userdata.owner} name="owner" onChange={inputHandle} />
              </div>
              <div>
                <label htmlFor="name-reg" className="form-label">
                  Address:
                </label>
                <input type="text" className="form-control" id="phone-reg" value={userdata.address} name="address" onChange={inputHandle} />
              </div>
              <div>
                <label htmlFor="email-reg" className="form-label">
                  First visit:
                </label>
                <input type="text" className="form-control" id="email-reg" placeholder={moment(userdata.createdAt).fromNow()}  />
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success">
                  Complete Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayDetails;
