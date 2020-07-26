package com.project.medicare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.medicare.entities.User;
import com.project.medicare.services.CartService;

@RestController
public class CartController {
	@Autowired
	private CartService cartService;
	
	@PutMapping("/customer/{userId}/cart/add/{productId}")
	public User addToCart(@PathVariable("userId") String userId,@PathVariable("productId") String productId){
		return cartService.addToCart(userId,productId);
	}
	
	@PutMapping("/customer/{userId}/cart/remove/{productId}")
	public User removeFromCart(@PathVariable("userId") String userId,@PathVariable("productId") String productId){
		return cartService.removeFromCart(userId,productId);
	}
	
	@PutMapping("/customer/{userId}/checkout")
	public User checkout(@PathVariable String userId) {
		return cartService.checkout(userId);
	}
	
	@PutMapping("/customer/{userId}/cart/delete/{productId}")
	public User deleteFromCart(@PathVariable("userId") String userId,@PathVariable("productId") String productId){
		return cartService.deleteItem(userId, productId);
	}
}
