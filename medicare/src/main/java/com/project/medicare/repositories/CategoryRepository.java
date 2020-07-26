package com.project.medicare.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.project.medicare.entities.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {

	@Query(value = "{ 'name' : ?0 }", fields = "{ 'productList' : 1 }")
	public Category findProductListByCategoryName(String categoryName);

	public Category findByProductListName(String string);

	public String findNameByProductListName(String string);

	public Category findByName(String name);

}
