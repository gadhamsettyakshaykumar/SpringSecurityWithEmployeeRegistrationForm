package com.maheswara.employeeRegistrationForm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.maheswara.employeeRegistrationForm.entity.User;
import com.maheswara.employeeRegistrationForm.repository.UserRepository;

@Service
public class CustomerUserDetailService implements UserDetailsService {
	@Autowired
	private UserRepository repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = repo.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("User not found"));
		if(user.isAccountLocked())
			throw new LockedException("Account locked due to failed attempt");
		
		return org.springframework.security.core.userdetails.User
				.withUsername(user.getUsername())
				.password(user.getPassword())
				.roles(user.getRole())
				.build();
	}

}
