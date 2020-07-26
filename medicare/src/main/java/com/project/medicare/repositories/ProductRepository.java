package com.project.medicare.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.project.medicare.entities.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

	public List<Product> findByBrand(String string);
	
	public List<Product> findByCategoryName(String categoryName);

	public Product findByName(String name);
	
	@Query(value = "{'discount':{'$gt':0}}")
	public List<Product> findDiscountProducts(Sort sort);
	
	@Query(value = "{'discount':0.0}")
	public List<Product> findNonDiscountProducts();

}
