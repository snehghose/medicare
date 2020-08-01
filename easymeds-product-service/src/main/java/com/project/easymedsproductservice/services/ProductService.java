package com.project.easymedsproductservice.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.project.easymedsproductservice.entities.Category;
import com.project.easymedsproductservice.entities.Product;
import com.project.easymedsproductservice.exceptions.ProductNotFoundException;
import com.project.easymedsproductservice.repositories.CategoryRepository;
import com.project.easymedsproductservice.repositories.ProductRepository;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	public Product getProductById(String id) throws ProductNotFoundException{
		Optional<Product> product=productRepository.findById(id);
		if(product.isPresent())
			return product.get();
		else
			throw new ProductNotFoundException("Product not found");
	}
	
	double decimalFormat(double value) {
		return (Math.ceil(value*100))/100;
	}
	
	public void addProduct(Product product) {
		product.setPrice(decimalFormat(product.getPrice()));
		product.setDiscount(decimalFormat(product.getDiscount()));
		product.setDiscountPrice(decimalFormat((100-product.getDiscount())*product.getPrice()/100));
		productRepository.save(product);
		Category category=categoryRepository.findByName(product.getCategoryName());
		List<Product> productList=category.getProductList();
		if(productList==null)
			productList=new ArrayList<>();
		productList.add(productRepository.findByName(product.getName()));
		category.setProductList(productList);
		int discount=(int)Math.ceil(product.getDiscount());
		category.setMaxDiscount(category.getMaxDiscount()>discount?category.getMaxDiscount():discount);
		categoryRepository.save(category);
	}
	
	public void updateProduct(Product product) {
		product.setPrice(decimalFormat(product.getPrice()));
		product.setDiscount(decimalFormat(product.getDiscount()));
		product.setDiscountPrice(decimalFormat((100-product.getDiscount())*product.getPrice()/100));
		Product existingProduct=productRepository.findById(product.getId()).get();
		if(existingProduct.getCategoryName().equals(product.getCategoryName())) {
			productRepository.save(product);
			Category category=categoryRepository.findByName(product.getCategoryName());
			int discount=(int)Math.ceil(product.getDiscount());
			category.setMaxDiscount(category.getMaxDiscount()>discount?category.getMaxDiscount():discount);
			categoryRepository.save(category);
		}
		else {
			deleteProduct(product.getId());
			addProduct(product);
		}
	}
	
	public void deleteProduct(String id) {
		Product product=productRepository.findById(id).get();
		Category category=categoryRepository.findByName(product.getCategoryName());
		List<Product> productList=category.getProductList();
		productList.remove(product);
		int max=0;
		for(Product p:productList) {
			max=(int)Math.ceil(Math.max(max, p.getDiscount()));
		}
		category.setProductList(productList);
		category.setMaxDiscount(max);
		categoryRepository.save(category);
		productRepository.deleteById(id);
	}

	public List<Product> getProductByCategoryName(String categoryName) {
		return productRepository.findByCategoryName(categoryName);
	}

	public List<Product> getDiscountProducts() {
		Sort sort=Sort.by(Sort.Direction.DESC, "discount");
		return productRepository.findDiscountProducts(sort);
	}

	public List<Product> getNonDiscountProducts() {
		return productRepository.findNonDiscountProducts();
	}

}
