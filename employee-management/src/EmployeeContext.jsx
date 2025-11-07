import React, { createContext, useState, useContext } from 'react';

// 1. Create the context

const EmployeeContext = createContext();

// 2. Create a "provider" component

// This component will wrap our app and provide the employee data

export function EmployeeProvider({ children }) {

  const [employees, setEmployees] = useState([]);

  // Function to add a new employee

  const addEmployee = (employee) => {

    // Add the new employee to the existing list

    setEmployees([...employees, employee]);

  };

  return (
<EmployeeContext.Provider value={{ employees, addEmployee }}>

      {children}
</EmployeeContext.Provider>

  );

}

// 3. Create a custom hook for easy access

// This lets components use the context without extra imports

export function useEmployees() {

  return useContext(EmployeeContext);

}
 