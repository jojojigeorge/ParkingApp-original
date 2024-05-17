import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
// import Layout from "../Components/Layout";
// import { useAuth } from "../../Context/Auth";
// import { useSearch } from "../../Context/Search";
import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;
import { MdDeleteForever, MdEdit } from "react-icons/md";
import Layout from "../../Components/Layout";
import { useAuth } from "../../../Context/Auth";
import { useSearch } from "../../../Context/Search";

const HomePage = () => {
  const navigate = useNavigate();

  const [authDetails, setAuthDetails] = useAuth();
  const [searchvalue, setSearchValue] = useSearch();

  const [query, setQuery] = useState("");
  const [allvehicle, setAllvehicle] = useState([]);
  // search vehicles
  const filterItems = useMemo(() => {
    return allvehicle.filter((item) => {
      return item.vehicle_no.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, allvehicle]);  

  const [selectedstatus, setSelectedstatus] = useState([
    { name: "Not paid", day: 0 },
    { name: "1 -day- ₹10", day: 1 },
    { name: "7 -day- ₹50", day: 7 },
    { name: "30-day-₹200", day: 30 },
  ]);
  //  delete vehicle details
  const handleDelete = async (e, id) => {
    try {
      e.preventDefault();
      const { data } = await axios.delete(`/api/v1/vehicle/delete/${id}`);
      getAllvehicleDetails();
    } catch (error) {}
  };

  // get all vehicle details in admin dashboard
  const getAllvehicleDetails = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/admin-allvehicle");
      setAllvehicle([...data?.allvehicle]);
    } catch (error) {
      console.log("error in fetch all order details", error);
    }
  };
  // on status change
  const handleChange = async (e, orderId) => {
    try {
      const { data } = await axios.put(`/api/v1/vehicle/edit-vehicle/${orderId}`, { paidfor: e });
      getAllvehicleDetails();
    } catch (error) {
      console.log("error in order staus update", error);
    }
  };
  useEffect(() => {
    getAllvehicleDetails();
  }, []);
  return (
    <>
      <Layout />
      <div className="container mt-5 mb-5">
        <div>
          <div>
            <div className="card container shadow-lg " style={{ maxWidth: "35rem" }}>
              <div className="d-flex justify-content-center">
                
              </div>
              <div className="text-center pt-4">  
                <h4>All Vehicle Admin View</h4> 
                <div className="d-flex justify-content-center">
                  <div>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} style={{ padding: "7px", borderRadius: "50px" }} />
                  </div>
                  <button
                    className="btn btn-outline-success"
                    style={{ borderRadius: "50px" }}
                    onClick={() => {
                      setSearchValue(query);
                      navigate("/private/addvehicle");
                    }}
                  >
                    Add
                  </button>
                </div>
                <Link to={"/private/dashboard/user/todaycollection"}>
                  <h6 className="btn btn-secondary mt-2 w-100">Today's Collection</h6>
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr className="text-center">
                      <th scope="col"> Vehicle</th>
                      <th scope="col"> User</th>
                      <th scope="col"> Expired</th>
                      <th scope="col">Plan</th>
                      {/* <th scope="col">Owner</th> */}
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {filterItems?.map((v, i) => (
                      <tr key={i}>
                        <td>{v.vehicle_no}</td>
                        <td>{v.user.name}</td>
                        <td>
                          {!v.backlog ? (
                            moment(v.expirydate).fromNow()
                          ) : (
                            <button className="btn btn-outline-primary" onClick={(e) => handleEdit(e, v._id)}>
                              Not paid
                            </button>
                          )}
                        </td>
                        {/* <td>{?v.createdAt>=v.expirydate:''}</td> */}
                        <td>
                          <Select
                            className=""
                            name="plan"
                            // placeholder={"change plan "}
                            value={v.paidfor}
                            onChange={(e) => {
                              handleChange(e, v._id);
                            }}
                          >
                            {selectedstatus?.map((st, i) => (
                              <Option value={st.day} key={i}>
                                {st.name}
                              </Option>
                            ))}
                          </Select>
                          {/* <select className="p-2" name="shipping" required onChange={(e) => {
                              handleChange(e.target.value, v._id);
                            }}>
                            {selectedstatus?.map((st, i) => (
                              <option value={st.day} key={i}>
                                {st.name}
                              </option>
                            ))}
                          </select> */}
                        </td>
                        {/* <td>{v.owner}</td> */}
                        <td>
                          <Link to={`/private/singlevehicle/${v._id}`}>
                            <button className="btn btn-outline-primary">
                              <MdEdit />
                            </button>
                          </Link>
                          <button className="btn btn-outline-danger" onClick={(e) => handleDelete(e, v._id)}>
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
