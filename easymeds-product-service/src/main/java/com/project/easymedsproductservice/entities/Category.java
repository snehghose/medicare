package com.project.easymedsproductservice.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
public class Category {
	@Id
	private String id;
	@Indexed(unique = true)
	private String name;
	private String image;
	@DBRef
	private List<Product> productList;
	private int maxDiscount;
	public Category() {
		super();
	}
	
	public Category(String name, String image, List<Product> productList, int maxDiscount) {
		super();
		this.name = name;
		this.image = image;
		this.productList = productList;
		this.maxDiscount = maxDiscount;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public List<Product> getProductList() {
		return productList;
	}
	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}
	public int getMaxDiscount() {
		return maxDiscount;
	}
	public void setMaxDiscount(int maxDiscount) {
		this.maxDiscount = maxDiscount;
	}
	
}
