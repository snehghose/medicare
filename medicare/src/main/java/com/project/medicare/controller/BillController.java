package com.project.medicare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.medicare.entities.Bill;
import com.project.medicare.entities.User;
import com.project.medicare.services.BillService;

@RestController
public class BillController {
	
	@Autowired
	private BillService billService;
	
	@GetMapping("/bill/{id}")
	public List<Bill> getBillByUser(@PathVariable String id) {
		return billService.getBillByUser(id);
	}
	
	@PostMapping("/bill")
	public User addBill(@RequestBody User user) {
		return billService.addBillByUser(user);
	}
}
