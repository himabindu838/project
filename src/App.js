import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './App.css'

const App = () => {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleDeleteEmployee = (index) => {
    setEmployees((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <AppLayout
        employees={employees}
        handleAddEmployee={handleAddEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
      />
    </Router>
  );
};

// AppLayout to conditionally render Navbar
const AppLayout = ({ employees, handleAddEmployee, handleDeleteEmployee }) => {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* Render Navbar only if not on the login page */}
      {!isLoginPage && <Navbar />}

      {/* Add padding to avoid overlap with fixed navbar */}
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/employeeform"
            element={<EmployeeForm onAddEmployee={handleAddEmployee} />}
          />
          <Route
            path="/employeetable"
            element={
              <EmployeeTable
                employees={employees}
                onDeleteEmployee={handleDeleteEmployee}
              />
            }
          />
          <Route path="/logout" element={<h2>Logout Page</h2>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
