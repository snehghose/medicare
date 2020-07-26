package com.project.medicare.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.project.medicare.entities.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	@Query(value = "{'role':'ROLE_EMPLOYEE'}")
	public List<User> findAllEmployees();

}
