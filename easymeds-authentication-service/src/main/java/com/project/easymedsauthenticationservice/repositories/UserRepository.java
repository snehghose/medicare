package com.project.easymedsauthenticationservice.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.easymedsauthenticationservice.entities.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	
	@Query(value = "{'role':'ROLE_EMPLOYEE'}")
	public List<User> findAllEmployees();

}
