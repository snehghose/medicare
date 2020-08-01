package com.project.easymedsproductservice.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.easymedsproductservice.entities.Category;
import com.project.easymedsproductservice.entities.Product;
import com.project.easymedsproductservice.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	@Autowired
	private ProductService productService;
	
	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}
	
	public Category getCategoryById(String id) {
		return categoryRepository.findById(id).get();
	}
	
	public void addCategory(Category category) {
		if(category.getProductList()==null)
			category.setProductList(new ArrayList<>());
		category.setMaxDiscount(0);
		categoryRepository.save(category);
	}
	
	public void updateCategory(Category category) {
		String categoryName=categoryRepository.findById(category.getId()).get().getName();
		List<Product> products=productService.getProductByCategoryName(categoryName);
		if(!category.getName().equals(categoryName)) {
			products.forEach(product -> {
				product.setCategoryName(category.getName());
				productService.updateProduct(product);
			});
		}
		categoryRepository.save(category);
	}
	
	public void deleteCategory(String id) {
		categoryRepository.findById(id).get().getProductList().forEach(product->productService.deleteProduct(product.getId()));
		categoryRepository.deleteById(id);
	}
}
