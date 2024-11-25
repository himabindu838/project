import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate("/");
    };
  return (
    <nav>
    <ul >
     <div className="navbar">
        <Link to="/dashboard" style={{textDecoration:"none",color:"white",fontSize:"1.2rem"}}>
          Home
        </Link>
     
        <Link to="/employeeform" style={{textDecoration:"none",color:"white",fontSize:"1.2rem"}}>
          Employee List
        </Link>
      <Link to="/employeetable" style={{textDecoration:"none",color:"white",fontSize:"1.2rem"}} >
         Hukum Gupta            </Link>          
      
      <Link to="/login" style={{textDecoration:"none",color:"white",fontSize:"1.2rem"}} >
      Logout     </Link>         
      </div>
      
    </ul>
  </nav>

  );
};


export default Navbar;
