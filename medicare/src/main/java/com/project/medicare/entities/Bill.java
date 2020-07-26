package com.project.medicare.entities;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;

public class Bill {
	private String id;
	private double total;
	@Indexed(direction = IndexDirection.ASCENDING)
	private LocalDateTime billDate;
	private List<PurchaseItem> billItems;
	
	public Bill() {
		super();
	}
	public Bill(String id, double total, LocalDateTime billDate, List<PurchaseItem> billItems) {
		super();
		this.id = id;
		this.total = total;
		this.billDate = billDate;
		this.billItems = billItems;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public LocalDateTime getBillDate() {
		return billDate;
	}
	public void setBillDate(LocalDateTime billDate) {
		this.billDate = billDate;
	}
	public List<PurchaseItem> getBillItems() {
		return billItems;
	}
	public void setBillItems(List<PurchaseItem> billItems) {
		this.billItems = billItems;
	}
	
	
}
