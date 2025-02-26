package com.project.easymedsauthenticationservice.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.easymedsauthenticationservice.entities.User;
import com.project.easymedsauthenticationservice.exceptions.UserAlreadyExistsException;
import com.project.easymedsauthenticationservice.repositories.UserRepository;
import com.project.easymedsauthenticationservice.security.AppUserDetails;

@Service
public class AppUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findById(username);
		user.orElseThrow(()->new UsernameNotFoundException("User not found"));
		return user.map(AppUserDetails::new).get();
	}
	
	public User signUp(User user) throws UserAlreadyExistsException {
		if(userRepository.existsById(user.getUserId()))
			throw new UserAlreadyExistsException("Username is taken");
		else {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			return userRepository.save(user);
		}
	}
	
	public User getUser(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findById(username);
		user.orElseThrow(()->new UsernameNotFoundException("User not found"));
		return user.get();
	}
	
	public List<User> getAllEmployees() {
		return userRepository.findAllEmployees();
	}
	
	public boolean checkUserId(String userId) {
		Optional<User> user = userRepository.findById(userId);
		return user.isPresent();
	}
	
	public User updateUser(User user) {
		return userRepository.save(user);
	}
	
	public void deleteUser(String id) {
		userRepository.deleteById(id);
	}
	
}
