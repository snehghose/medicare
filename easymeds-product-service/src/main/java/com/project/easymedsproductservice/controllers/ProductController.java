package com.project.easymedsproductservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.easymedsproductservice.entities.Product;
import com.project.easymedsproductservice.exceptions.ProductNotFoundException;
import com.project.easymedsproductservice.services.ProductService;


@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@GetMapping
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}
	
	@GetMapping("/id/{id}")
	public Product getProductById(@PathVariable String id) throws ProductNotFoundException {
		return productService.getProductById(id);
	}
	
	@GetMapping("/discount")
	public List<Product> getDiscountProducts() {
		return productService.getDiscountProducts();
	}
	
	@GetMapping("/no-discount")
	public List<Product> getNonDiscountProducts() {
		return productService.getNonDiscountProducts();
	}
	
	@GetMapping("/{categoryName}")
	public List<Product> getProductByCategoryName(@PathVariable String categoryName) {
		return productService.getProductByCategoryName(categoryName);
	}
	
	@PostMapping
	public void addProduct(@RequestBody Product product) {
		productService.addProduct(product);
	}
	
	@PutMapping
	public void updateProduct(@RequestBody Product product) {
		productService.updateProduct(product);
	}
	
	@DeleteMapping("/{id}")
	public void deleteProduct(@PathVariable String id) {
		productService.deleteProduct(id);
	}
}
