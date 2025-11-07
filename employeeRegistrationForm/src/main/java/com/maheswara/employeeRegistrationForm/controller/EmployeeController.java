package com.maheswara.employeeRegistrationForm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maheswara.employeeRegistrationForm.dtos.EmployeeDto;
import com.maheswara.employeeRegistrationForm.entity.RegistrationEntity;
import com.maheswara.employeeRegistrationForm.repository.EmployeeRegistrationrepository;
import com.maheswara.employeeRegistrationForm.service.EmployeeServiceImpl;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employees")

public class EmployeeController {
	
	@Autowired
	public EmployeeServiceImpl service;
	
	@PostMapping("/create")
	public ResponseEntity<RegistrationEntity> createUser(@RequestBody EmployeeDto dto){
		return ResponseEntity.status(201).body(service.saveEmployee(dto));
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<RegistrationEntity>> getallemp(){
		return ResponseEntity.ok().body(service.getAllEmployee());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity< Optional<RegistrationEntity>> getallEmpid(@PathVariable Long id){
		return ResponseEntity.ok().body(service.getEmployeegetbyid(id));
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<RegistrationEntity> delete(@PathVariable Long id){
		service.deletebyid(id);
		return ResponseEntity.noContent().build();
	}

}
