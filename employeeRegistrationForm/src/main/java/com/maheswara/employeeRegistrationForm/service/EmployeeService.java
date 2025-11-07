package com.maheswara.employeeRegistrationForm.service;

import java.util.List;
import java.util.Optional;

import com.maheswara.employeeRegistrationForm.dtos.EmployeeDto;
import com.maheswara.employeeRegistrationForm.entity.RegistrationEntity;

public interface EmployeeService {
	
	RegistrationEntity saveEmployee(EmployeeDto employeedto);
	
	List<RegistrationEntity> getAllEmployee();
	
	void deletebyid(Long id);

	Optional<RegistrationEntity> getEmployeegetbyid(Long id);
	
	

}
