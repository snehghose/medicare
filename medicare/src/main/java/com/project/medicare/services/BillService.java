package com.project.medicare.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.medicare.entities.Bill;
import com.project.medicare.entities.User;
import com.project.medicare.repositories.UserRepository;

@Service
public class BillService {
	
	@Autowired
	private UserRepository userRepository;
	
	public List<Bill> getBillByUser(String id) {
		return userRepository.findById(id).get().getBills();
	}
	
	public User addBillByUser(User user) {
//		User user=userRepository.findById(id).get();
//		List<Bill> bills=user.getBills();
//		bills.add(bill);
//		user.setBills(bills);
		return userRepository.save(user);
	}

}
