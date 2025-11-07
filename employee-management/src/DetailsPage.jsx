import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import { Link } from "react-router-dom";
import "./App.css";

function DetailsPage() {
  const { token } = useAuth(); // 🔒 JWT token from login
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees/get", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, [token]);

  // ✅ Filter employees by name
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2>🌟 Employee Details</h2>
      <Link to="/" className="back-link">← Register Another Employee</Link>

      {/* 🔍 Search Feature */}
      <div className="form-group" style={{ marginTop: "20px" }}>
        <label>Search by Name:</label>
        <input
          type="text"
          placeholder="Enter name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🧾 Employee Table */}
      {filteredEmployees.length > 0 ? (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobilenumber}</td>
                <td>{employee.address}</td>
                <td>{employee.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "20px" }}>No employees found.</p>
      )}
    </div>
  );
}

export default DetailsPage;
