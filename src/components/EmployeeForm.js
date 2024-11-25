import React, { useState } from "react";

const EmployeeForm = ({ onAddEmployee, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    mobile: initialData.mobile || "",
    designation: initialData.designation || "HR",
    gender: initialData.gender || "",
    courses: initialData.courses || [],
    image: initialData.image || null,
    index: initialData.index, // Track the index for editing
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        courses: checked
          ? [...prev.courses, value]
          : prev.courses.filter((course) => course !== value),
      }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.gender) {
      alert("Please fill all required fields.");
      return;
    }

    // Pass data to parent component
    if (onAddEmployee) {
      onAddEmployee(formData);
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      mobile: "",
      designation: "HR",
      gender: "",
      courses: [],
      image: null,
    });
  };

  return (
    <div>
        <h2 style={{backgroundColor:"yellow",color:"black",fontSize:"1.2rem"
        }}>Create Employee</h2>
    <div className="employeeForm">
    <form onSubmit={handleSubmit}>
      <div className="empData">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="empData">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="empData">
        <label>Mobile No:</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
      </div>
      <div className="empData">
        <label>Designation:</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
      <div className="empData">
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
          onChange={handleChange}
        />{" "}
        Female
      </div>
      <div className="empData">
        <label>Course:</label>
        <input
          type="checkbox"
          name="courses"
          value="MCA"
          checked={formData.courses.includes("MCA")}
          onChange={handleChange}
        />{" "}
        MCA
        <input
          type="checkbox"
          name="courses"
          value="BCA"
          checked={formData.courses.includes("BCA")}
          onChange={handleChange}
        />{" "}
        BCA
        <input
          type="checkbox"
          name="courses"
          value="BSC"
          checked={formData.courses.includes("BSC")}
          onChange={handleChange}
        />{" "}
        BSC
      </div>
      <div className="empData">
        <label>Image Upload:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
      </div>
      <br/>
      <br/>
      <button type="submit" style={{backgroundColor:"lightcoral",border:"2px solid black"}}>submit</button>
    </form>
    </div>
    </div>
  );
};

export default EmployeeForm;
