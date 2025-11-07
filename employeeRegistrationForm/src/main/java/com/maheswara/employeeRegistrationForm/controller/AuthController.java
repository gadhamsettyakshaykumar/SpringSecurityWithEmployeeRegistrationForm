package com.maheswara.employeeRegistrationForm.controller;


import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maheswara.employeeRegistrationForm.dtos.UserDto;
import com.maheswara.employeeRegistrationForm.entity.LoginAudit;
import com.maheswara.employeeRegistrationForm.entity.User;
import com.maheswara.employeeRegistrationForm.repository.LoginAuditRepository;
import com.maheswara.employeeRegistrationForm.repository.LoginAuditRepository;
import com.maheswara.employeeRegistrationForm.repository.UserRepository;
import com.maheswara.employeeRegistrationForm.security.JwtTokenProvider;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private AuthenticationManager authmanager;
	
	@Autowired
	private LoginAuditRepository auditRepo;

	
	@Autowired
	private JwtTokenProvider jwtProvider;
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@PostMapping("/register")
	public Map<String,String> register (@RequestBody UserDto dto){
		if (dto.getUsername() == null || dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new IllegalArgumentException("Username and password cannot be empty");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRole("USER");
        user.setAccountLocked(false);
        repo.save(user);

        return Map.of("message", "User registered successfully");
	}
	
	@PostMapping("/login")
	public Map<String,String> login(@RequestBody UserDto dto){
		authmanager.authenticate(
		        new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword())
		    );

		    User user = repo.findByUsername(dto.getUsername())
		                    .orElseThrow(() -> new RuntimeException("User not found"));

		    user.setLastLoginTime(LocalDateTime.now());
		    repo.save(user);

		    //  Save new login entry to audit table
		    LoginAudit audit = new LoginAudit();
		    audit.setUsername(dto.getUsername());
		    audit.setLoginTime(LocalDateTime.now());
		    auditRepo.save(audit);

		    String token = jwtProvider.generateToken(user.getUsername(), user.getRole());
		    return Map.of("token", token);
	}
	@PostMapping("/logout")
	public Map<String, String> logout(@RequestHeader("Authorization") String header) {
	    if (header != null && header.startsWith("Bearer ")) {
	        String token = header.substring(7);
	        String username = jwtProvider.getUsername(token);

	        //  find the last audit entry
	        List<LoginAudit> audits = auditRepo.findByUsername(username);
	        if (!audits.isEmpty()) {
	            LoginAudit lastAudit = audits.get(audits.size() - 1);
	            lastAudit.setLogoutTime(LocalDateTime.now());
	            auditRepo.save(lastAudit);
	        }

	        //  also update user table if you want
	        User user = repo.findByUsername(username).orElseThrow();
	        user.setLastLogoutTime(LocalDateTime.now());
	        repo.save(user);
	    }

	    return Map.of("message", "User logged out successfully");
	}


}
