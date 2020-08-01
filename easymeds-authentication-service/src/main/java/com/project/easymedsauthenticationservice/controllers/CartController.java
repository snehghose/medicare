package com.project.easymedsauthenticationservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.project.easymedsauthenticationservice.entities.Product;
import com.project.easymedsauthenticationservice.entities.User;
import com.project.easymedsauthenticationservice.services.CartService;

@RestController
public class CartController {
	@Autowired
	private CartService cartService;
	@Autowired
	private RestTemplate restTemplate;
	
	private Product getProduct(String productId) {
		Product product=restTemplate.getForObject("http://easymeds-product-service/product/id/"+productId, Product.class);
		return product;
	}
	
	@PutMapping("/customer/{userId}/cart/add/{productId}")
	public User addToCart(@PathVariable("userId") String userId,@PathVariable("productId") String productId){
		return cartService.addToCart(userId, getProduct(productId));
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
