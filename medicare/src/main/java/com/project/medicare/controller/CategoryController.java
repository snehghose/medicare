package com.project.medicare.controller;

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

import com.project.medicare.entities.Category;
import com.project.medicare.services.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping
	private List<Category> getAllCategories() {
		return categoryService.getAllCategories();
	}
	
	@GetMapping("/{id}")
	private Category getCategoryById(@PathVariable String id) {
		return categoryService.getCategoryById(id);
	}
	
	@PostMapping
	private void addCategory(@RequestBody Category category) {
		categoryService.addCategory(category);
	}
	
	@PutMapping
	private void updateCategory(@RequestBody Category category) {
		categoryService.updateCategory(category);
	}
	
	@DeleteMapping("/{id}")
	private void deleteCategory(@PathVariable String id) {
		categoryService.deleteCategory(id);
	}
	
}
