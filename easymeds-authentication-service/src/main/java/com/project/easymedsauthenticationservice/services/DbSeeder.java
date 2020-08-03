package com.project.easymedsauthenticationservice.services;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import com.project.easymedsauthenticationservice.entities.Cart;
import com.project.easymedsauthenticationservice.entities.Role;
import com.project.easymedsauthenticationservice.entities.User;
import com.project.easymedsauthenticationservice.repositories.UserRepository;

@Service
public class DbSeeder implements CommandLineRunner {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AppUserDetailsService appUserDetailsService;
	@Autowired
	private NextSequenceService nextSequenceService;

	@Override
	public void run(String... args) throws Exception {
		if(userRepository.findAll().isEmpty()) {
			User customer=new User("customer", "Celia", "Jones", LocalDate.of(1997, 2, 3), 8937837368L, "password", Role.CUSTOMER, new Cart(new ArrayList<>(), 0.0, 0.0), new ArrayList<>());
			User employee=new User("employee"+nextSequenceService.getNextSequence("customSequences"), "Adam", "Sandler", LocalDate.of(1993, 6, 5), 8937833432L, "password", Role.EMPLOYEE, null, null);
			User admin=new User("admin", "John", "Doe", LocalDate.of(1993, 6, 5), 8937833432L, "password", Role.ADMIN, null, null);
			appUserDetailsService.signUp(customer);
			appUserDetailsService.signUp(employee);
			appUserDetailsService.signUp(admin);
		}
	}

}
