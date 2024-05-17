import Layout from "../Components/Layout";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; //to redirect pages
import { useSearch } from "../../Context/Search";
import { Select } from "antd";
const { Option } = Select;


export const AddVehicle = () => {

  const [selectedstatus, setSelectedstatus] = useState([
    { name: "Not paid", day: 0 },
    { name: "1-day-₹10", day: 1 },
    { name: "7-day-₹50", day: 7 },
    { name: "30-day-₹200", day: 30 },
  ]); 

  const navigate = useNavigate();
  const [searchvalue, setSearchValue] = useSearch();
  const [userdata, setUserData] = useState(searchvalue ? { owner: "", paidfor: 0, phone: "", address: "", vehicle_no: searchvalue } : { owner: "", vehicle_no: "", paidfor: 0, phone: "", address: "" });
  // const [userdata, setUserData] = useState({ owner: "", vehicle_no: "", paidfor: "", phone: "", address: "" });
  // add searched vehicle no to add vehicle details form
  const inputHandle = (e) => {
    console.log(e.target)
    setUserData({ ...userdata, [e.target.name]: e.target.value });
    console.log(userdata);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { owner, phone, address, paidfor, vehicle_no } = userdata;
      const res = await axios.post("/api/v1/vehicle/add-vehicle/", { address, phone, owner, vehicle_no, paidfor });
      if (res.data.success) {
        toast.success(res.data.message);
        setUserData({ owner: "", vehicle_no: "", paidfor: "", phone: "", address: "" });
        setSearchValue('')
        navigate("/private");
      } else {
        toast.error(res.data.error);  
      }
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong in registration");
    }
  };  
  return (
    <>
      <Layout />
      <div className="container mt-5 mb-5">
        <div className="card container shadow-lg  " style={{ maxWidth: "35rem" }}>
          <div className="display-6 text-center mt-5 ">Add Vehicle</div>
          <hr />
          <div className="card-body ">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name-reg" className="form-label">
                  Vehicle No:
                </label>
                <input type="text" required className="form-control" id="name-reg" value={userdata.vehicle_no} name="vehicle_no" onChange={(e) => setUserData({ ...userdata, vehicle_no: e.target.value.trim() })} />
              </div>
              <div>
                <label htmlFor="name-reg" className="form-label">
                  Plan :
                </label>
                <div className="lh-5"><Select
                size='large'
                  className="w-100 h-69" 
                  name="plan" 
                  defaultValue={0}
                  onChange={(e) => setUserData({ ...userdata, paidfor: e})} 
                >
                  {selectedstatus?.map((st, i) => (
                    <Option value={st.day} key={i}>
                      {st.name}
                    </Option>
                  ))}
                </Select></div>
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

export default AddVehicle;
