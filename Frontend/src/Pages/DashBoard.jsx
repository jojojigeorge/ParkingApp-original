import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";

const DashBoard = () => {
  const [collection,setCollection]=useState({})
  // get all vehicle details in admin dashboard 
  const getAllvehicleDetails = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/user-todaycollection");
      // setAllvehicle([...data?.allvehicle]);
      setCollection(data.todaycollection)  
    } catch (error) { 
      console.log("todays collection details error", error);
    }
  };
  useEffect(()=>{
    getAllvehicleDetails()
  },[])
  return (
    <div>
      <Layout />
      <div className="card container shadow-lg mt-5 d-flex justify-content-center " style={{ maxWidth: "35rem" }}>
        <h4 className="text-center mt-4">Today Collection</h4>

        <div className="row row-cols-2 text-center">
          <div className="col-6 mt-3 mb-4">
            <div className="col">Total collection:</div>
            <div className="col">Not paid</div>
            <div className="col">Plan 1[1 day -10]</div>
            <div className="col">Plan 2[7 day-50]</div>
            <div className="col">Plan 3[30 day-200]</div>
          </div>
          <div className="col-6 mt-3 mb-4">
            <div className="col">{collection.total}</div>
            <div className="col">{collection.plannotpaid}</div>
            <div className="col">{collection.planone}</div>
            <div className="col">{collection.planseven}</div>
            <div className="col">{collection.planmonth}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
