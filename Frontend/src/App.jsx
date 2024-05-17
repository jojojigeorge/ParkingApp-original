import React from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound.jsx";
import Registration from "./Pages/Authentication/Registration.jsx";
import Login from "./Pages/Authentication/Login.jsx";
import DisplayDetails from "./Pages/DisplayDetails.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AddVehicle from "./Pages/AddVehicle.jsx";
import PrivateRoute from "./Components/Routes/Private.jsx";
import DashBoard from "./Pages/DashBoard.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import TodayCollection from "./Pages/Admin/TodayCollection.jsx";
import ForgotPassword from "./Pages/Authentication/ForgotPassword.jsx";

const App = () => {
  

  return (
    <Routes>
      <Route path="/private" element={<PrivateRoute />}>
        <Route path="" element={<HomePage />} />
        <Route path="dashboard/user" element={<DashBoard />} />
        <Route path="dashboard/user/todaycollection" element={<TodayCollection />} />
        <Route path="singlevehicle/:vid" element={<DisplayDetails />} />
        <Route path="addvehicle" element={<AddVehicle />} />
      </Route>

      <Route path="/private" element={<PrivateRoute />}>
        <Route path="dashboard/admin" element={<AdminDashboard />} />
      </Route>

      <Route path="/login" element={<Login />} /> 
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
