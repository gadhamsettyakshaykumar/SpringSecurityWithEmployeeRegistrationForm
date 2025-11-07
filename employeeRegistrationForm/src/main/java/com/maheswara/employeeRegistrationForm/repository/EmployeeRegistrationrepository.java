package com.maheswara.employeeRegistrationForm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maheswara.employeeRegistrationForm.entity.RegistrationEntity;

@Repository
public interface EmployeeRegistrationrepository extends JpaRepository<RegistrationEntity,Long>  {

}
