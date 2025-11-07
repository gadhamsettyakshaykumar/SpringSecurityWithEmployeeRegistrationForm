package com.maheswara.employeeRegistrationForm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maheswara.employeeRegistrationForm.dtos.EmployeeDto;
import com.maheswara.employeeRegistrationForm.entity.RegistrationEntity;
import com.maheswara.employeeRegistrationForm.repository.EmployeeRegistrationrepository;

@Service
public class EmployeeServiceImpl  implements EmployeeService{
	@Autowired
	public EmployeeRegistrationrepository repo;
	

	@Override
	public RegistrationEntity saveEmployee(EmployeeDto employeedto) {
		RegistrationEntity emp = new RegistrationEntity();
		emp.setName(employeedto.getName());
		emp.setDob(employeedto.getDob());
		emp.setAddress(employeedto.getAddress());
		emp.setEmail(employeedto.getEmail());
		emp.setMobilenumber(employeedto.getMobilenumber());
		// TODO Auto-generated method stub
		return repo.save(emp);
	}

	@Override
	public List<RegistrationEntity> getAllEmployee() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Optional<RegistrationEntity> getEmployeegetbyid(Long id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}

	@Override
	public void deletebyid(Long id) {
		// TODO Auto-generated method stub
		repo.deleteById(id);
		
	}

	

}
