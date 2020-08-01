package com.project.easymedsauthenticationservice.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.easymedsauthenticationservice.entities.Bill;
import com.project.easymedsauthenticationservice.entities.Cart;
import com.project.easymedsauthenticationservice.entities.CartItem;
import com.project.easymedsauthenticationservice.entities.Product;
import com.project.easymedsauthenticationservice.entities.PurchaseItem;
import com.project.easymedsauthenticationservice.entities.User;
import com.project.easymedsauthenticationservice.repositories.UserRepository;

@Service
public class CartService {
	@Autowired
	private UserRepository userRepository;
	
	public User addToCart(String userId, Product product) {
		User user=userRepository.findById(userId).get();
		Cart cart=(user.getCart()==null)?new Cart(new ArrayList<>(),0.0,0.0):user.getCart();
		cart.setTotal(cart.getTotal()+product.getDiscountPrice());
		cart.setMrp(cart.getMrp()+product.getPrice());
		List<CartItem> items=cart.getItems();
		for(int i=0;i<items.size();i++) {
			CartItem item=items.get(i);
			if(item.getId().equals(product.getId())) {
				item.setQuantity(item.getQuantity()+1);
				items.set(i, item);
				cart.setItems(items);
				user.setCart(cart);
				return userRepository.save(user);
			}
		}
		items.add(new CartItem(product.getId(),product, 1));
		cart.setItems(items);
		user.setCart(cart);
		return userRepository.save(user);
	}

	public User removeFromCart(String userId, String productId) {
		User user=userRepository.findById(userId).get();
		Cart cart=user.getCart();
		List<CartItem> items=cart.getItems();
		for(int i=0;i<items.size();i++) {
			CartItem item=items.get(i);
			if(item.getId().equals(productId)) {
				if(item.getQuantity()>1) {
					item.setQuantity(item.getQuantity()-1);
					items.set(i, item);
				}
				else
					items.remove(i);
				break;
			}
		}
		cart.setItems(items);
		cart.setMrp(items.stream().map(item->item.getProduct().getPrice()*item.getQuantity()).reduce(0.0, Double::sum));
		cart.setTotal(items.stream().map(m->m.getProduct().getDiscountPrice()*m.getQuantity()).reduce(0.0, Double::sum));
		user.setCart(cart);
		return userRepository.save(user);
	}
	
	public User checkout(String userId) {
		User user=userRepository.findById(userId).get();
		Cart cart=user.getCart();
		List<PurchaseItem> items=new ArrayList<>();
		for(CartItem item:cart.getItems()) {
			items.add(new PurchaseItem(item.getProduct(), item.getQuantity(), item.getProduct().getDiscountPrice()));
		}
		List<Bill> bills=user.getBills();
		if(bills==null)
			bills=new ArrayList<>();
		bills.add(0,new Bill(UUID.randomUUID().toString(),cart.getTotal(), LocalDateTime.now(), items));
		user.setBills(bills);
		user.setCart(new Cart(new ArrayList<>(), 0.0, 0.0));
		return userRepository.save(user);
	}
	
	public User deleteItem(String userId,String productId) {
		User user=userRepository.findById(userId).get();
		Cart cart=user.getCart();
		List<CartItem> items=cart.getItems();
		for(int i=0;i<items.size();i++) {
			CartItem item=items.get(i);
			if(item.getId().equals(productId)) {
				items.remove(i);
				break;
			}
		}
		cart.setItems(items);
		cart.setMrp(items.stream().map(item->item.getProduct().getPrice()*item.getQuantity()).reduce(0.0, Double::sum));
		cart.setTotal(items.stream().map(m->m.getProduct().getDiscountPrice()*m.getQuantity()).reduce(0.0, Double::sum));
		user.setCart(cart);
		return userRepository.save(user);
	}

}
