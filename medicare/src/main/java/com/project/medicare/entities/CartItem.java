package com.project.medicare.entities;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class CartItem {
	private String id;
	@DBRef
	private Product product;
	private int quantity;
	public CartItem() {
		super();
	}
	public CartItem(String id, Product product, int quantity) {
		super();
		this.id = id;
		this.product = product;
		this.quantity = quantity;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		return "CartItem [product=" + product + ", quantity=" + quantity + "]";
	};
	
	
}
