package com.project.easymedsauthenticationservice.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
	@Id
	private String id;
	private String name;
	private String brand;
	private String manufacturer;
	private double price;
	private String image;
	private double discount;
	private double discountPrice;
	private String categoryName;
	
	
	public Product() {
		super();
	}


	public Product(String name, String brand, String manufacturer, double price, String image, double discount,
			double discountPrice, String categoryName) {
		super();
		this.name = name;
		this.brand = brand;
		this.manufacturer = manufacturer;
		this.price = price;
		this.image = image;
		this.discount = discount;
		this.discountPrice=discountPrice;
		this.categoryName = categoryName;
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


	public String getBrand() {
		return brand;
	}


	public void setBrand(String brand) {
		this.brand = brand;
	}


	public String getManufacturer() {
		return manufacturer;
	}


	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public double getDiscount() {
		return discount;
	}


	public void setDiscount(double discount) {
		this.discount = discount;
	}
	
	

	public double getDiscountPrice() {
		return discountPrice;
	}


	public void setDiscountPrice(double discountPrice) {
		this.discountPrice = discountPrice;
	}


	public String getCategoryName() {
		return categoryName;
	}


	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	
	
	
}
