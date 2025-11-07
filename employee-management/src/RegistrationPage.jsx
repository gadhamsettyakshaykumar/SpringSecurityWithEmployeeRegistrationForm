import React, { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./App.css";

function RegistrationPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    mobilenumber: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/employees/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register employee");
      }

      alert("Employee registered successfully 🌟");
      navigate("/details");
    } catch (error) {
      console.error(error);
      alert("Error while registering employee ❌");
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">✨ Employee Registration</h2>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-grid">
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="number"
                name="mobilenumber"
                placeholder="Enter mobile number"
                value={formData.mobilenumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ gridColumn: "1 / 3" }}>
              <label>Address</label>
              <textarea
                name="address"
                placeholder="Enter address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Register Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
