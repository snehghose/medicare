package com.project.easymedsauthenticationservice.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.easymedsauthenticationservice.entities.Cart;
import com.project.easymedsauthenticationservice.entities.Password;
import com.project.easymedsauthenticationservice.entities.Role;
import com.project.easymedsauthenticationservice.entities.User;
import com.project.easymedsauthenticationservice.exceptions.UserAlreadyExistsException;
import com.project.easymedsauthenticationservice.services.AppUserDetailsService;
import com.project.easymedsauthenticationservice.services.NextSequenceService;

@RestController
public class UserController {
	
	@Autowired
	private AppUserDetailsService appUserDetailsService;
	@Autowired
	private NextSequenceService nextSequenceService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("/user/{id}")
	public User getCustomer(@PathVariable String id) {
		return appUserDetailsService.getUser(id);
	}
	
	@GetMapping("/check/{userId}")
	public boolean checkUserId(@PathVariable String userId) {
		return appUserDetailsService.checkUserId(userId);
	}
	
	@PostMapping("/customer")
	public User signUpCustomer(@RequestBody User user) throws UserAlreadyExistsException {
		user.setRole(Role.CUSTOMER);
		user.setCart(new Cart(new ArrayList<>(), 0.0, 0.0));
		user.setBills(new ArrayList<>());
		return appUserDetailsService.signUp(user);
	}
	
	@PutMapping("/customer")
	public User updateCustomer(@RequestBody User user) {
		return appUserDetailsService.updateUser(user);
	}
	
	@PutMapping("/user/{userId}")
	public boolean updatePassword(@PathVariable String userId, @RequestBody Password password) {
		User user=appUserDetailsService.getUser(userId);
		if(passwordEncoder.matches(password.getOldPassword(), user.getPassword())) {
			user.setPassword(passwordEncoder.encode(password.getNewPassword()));
			appUserDetailsService.updateUser(user);
			return true;
		}
		return false;
	}
	
	@DeleteMapping("/employee/{id}")
	public void deleteUser(@PathVariable String id) {
		appUserDetailsService.deleteUser(id);
	}
	
	@GetMapping("/employee/{id}")
	public User getEmployee(@PathVariable String id) {
		return appUserDetailsService.getUser(id);
	}
	
	@GetMapping("/employee")
	public List<User> getAllEmployees() {
		return appUserDetailsService.getAllEmployees();
	}
	
	@PostMapping("/employee")
	public User signUpEmployee(@RequestBody User user) throws UserAlreadyExistsException {
		user.setUserId("employee"+nextSequenceService.getNextSequence("customSequences"));
		user.setRole(Role.EMPLOYEE);
		user.setPassword("password");
		return appUserDetailsService.signUp(user);
	}
	
	@PutMapping("/employee")
	public User updateEmployee(@RequestBody User user) {
		user.setRole(Role.EMPLOYEE);
		return appUserDetailsService.updateUser(user);
	}
	
	@PutMapping("/manager")
	public User updateManager(@RequestBody User user) {
		user.setRole(Role.ADMIN);
		return appUserDetailsService.updateUser(user);
	}
	
}
