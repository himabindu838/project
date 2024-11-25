import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm"; // Ensure correct import
import DeleteIcon from '@mui/icons-material/Delete';


const EmployeeTable = ({ employees = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState(null);
  const [employeeList, setEmployeeList] = useState(employees);
  const [editingEmployee, setEditingEmployee] = useState(null); // State for editing

  // Filter employees based on the search term
  const filteredEmployees = employeeList.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort employees based on sort configuration
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedEmployees.slice(indexOfFirstRow, indexOfLastRow);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle delete
  const handleDelete = (index) => {
    const updatedEmployees = employeeList.filter((_, i) => i !== index);
    setEmployeeList(updatedEmployees);
  };

  // Handle edit
  const handleEdit = (index) => {
    setEditingEmployee({ ...employeeList[index], index });
  };

  // Handle save after editing
  const handleSave = (updatedEmployee) => {
    const updatedEmployees = [...employeeList];
    updatedEmployees[updatedEmployee.index] = updatedEmployee;
    setEmployeeList(updatedEmployees);
    setEditingEmployee(null); // Close the form
  };

  return (
    <div>
      <h3>Employee Table</h3>
      {editingEmployee ? (
        <EmployeeForm
          onAddEmployee={handleSave}
          initialData={editingEmployee}
        />
      ) : (
        <>
          {/* Search Filter */}
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "10px", padding: "5px" }}
          />

          {currentRows.length > 0 ? (
            <table
              border="1"
              cellPadding="10"
              cellSpacing="0"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Image</th>
                  <th onClick={() => handleSort("name")}>Name</th>
                  <th onClick={() => handleSort("email")}>Email</th>
                  <th>Mobile No</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Courses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((employee, index) => (
                  <tr key={index}>
                    <td>
                      {employee.image ? (
                        <img
                          src={URL.createObjectURL(employee.image)}
                          alt="Employee"
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.courses.join(", ")}</td>
                    <td>
                      <button style={{width:"50px",backgroundColor:"lightgrey",color:"black",fontSize:"1rem"}} onClick={() => handleEdit(index)}>Edit</button>
                      <button  style={{width:"60px",backgroundColor:"red",color:"white",fontSize:"1rem"}} onClick={() => handleDelete(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No employees added yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeTable;
