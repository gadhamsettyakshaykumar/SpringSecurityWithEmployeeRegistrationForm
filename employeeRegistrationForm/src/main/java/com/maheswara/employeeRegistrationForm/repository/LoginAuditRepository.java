package com.maheswara.employeeRegistrationForm.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maheswara.employeeRegistrationForm.entity.LoginAudit;
@Repository
public interface LoginAuditRepository extends JpaRepository<LoginAudit, Long> {
    List<LoginAudit> findByUsername(String username);
}
