import React from "react";
import { useAuth } from "../../Context/Auth";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Layout = () => {
    const [authDetails, setAuthDetails] = useAuth()
    const handleLogout = (e) => {
      // e.preventDefault()
      setAuthDetails({  
        ...authDetails,
        user: "",
        token: "",
      });
      localStorage.removeItem("authDetails");
      toast.success("logout successfully", { duration: 6000 });
    } 
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/private"}>
            PARKING-APP
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to={"/private"}>
                  Home  
                </NavLink>  
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to={"/private/addvehicle"}>
                  Add
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to={"/viewallvehicle"}>
                  View All
                </NavLink>
              </li>  */}

              <li className="nav-item dropdown dropstart ms-0">
                <ul className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {authDetails.user ? authDetails.user.name : "Login"}
                </ul>
                {authDetails.user.name ? (
                  <>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <NavLink to={`/private/dashboard/${authDetails.user.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
                          Logout
                        </NavLink>
                      </li>
                      {/* <li><hr className="dropdown-divider" /></li>
                    <li><NavLink className="dropdown-item" >Something else here</NavLink></li> */}
                    </ul>
                  </>
                ) : (
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <NavLink to="/registration" className="dropdown-item">
                        Register
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    </li>
                    {/* <li><hr className="dropdown-divider" /></li>
                    <li><NavLink  className="dropdown-item" >Something else here</NavLink></li> */}
                  </ul>
                )}
              </li>
              
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Layout;
