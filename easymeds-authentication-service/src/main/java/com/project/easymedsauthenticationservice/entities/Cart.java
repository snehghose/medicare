package com.project.easymedsauthenticationservice.entities;

import java.util.List;

public class Cart {
	private List<CartItem> items;
	private double mrp;
	private double total;
	
	public Cart() {
		super();
	}

	public Cart(List<CartItem> items, double mrp, double total) {
		super();
		this.items = items;
		this.mrp = mrp;
		this.total = total;
	}

	public List<CartItem> getItems() {
		return items;
	}

	public void setItems(List<CartItem> items) {
		this.items = items;
	}

	public double getMrp() {
		return mrp;
	}

	public void setMrp(double mrp) {
		this.mrp = mrp;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	@Override
	public String toString() {
		return "Cart [items=" + items + ", total=" + total + "]";
	}

	
	
}
