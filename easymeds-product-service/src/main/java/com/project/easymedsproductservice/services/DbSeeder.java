package com.project.easymedsproductservice.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import com.project.easymedsproductservice.entities.Category;
import com.project.easymedsproductservice.entities.Product;

@Service
public class DbSeeder implements CommandLineRunner {
	
	@Autowired
	private ProductService productService;
	@Autowired
	private CategoryService categoryService;

	@Override
	public void run(String... args) throws Exception {
		if(categoryService.getAllCategories().isEmpty()) {
			Category c1=new Category("Personal and Home Essentials", "https://d1ljlatelrv1en.cloudfront.net/category/original/personal-care-mesh.png", new ArrayList<>(), 0);
			Category c2=new Category("Nutrition and Supplements", "https://d1ljlatelrv1en.cloudfront.net/category/original/nutrition-new.png", new ArrayList<>(), 0);
			Category c3=new Category("COVID Essentials", "https://d1ljlatelrv1en.cloudfront.net/category/original/daily-essentials.png", new ArrayList<>(), 0);
			Category c4=new Category("Diabetic Care", "https://d1ljlatelrv1en.cloudfront.net/category/original/daibetic-care.png", new ArrayList<>(), 0);
			categoryService.addCategory(c1);
			categoryService.addCategory(c2);
			categoryService.addCategory(c3);
			categoryService.addCategory(c4);
			
			productService.addProduct(new Product("Dettol Antiseptic Liquid 550ml", "Dettol", "Reckitt Benckiser India Ltd", 160.83, "https://res.cloudinary.com/du8msdgbj/image/upload/aza08kjwwmu4kig5lhok.jpg", 10, 0, c1.getName()));
			productService.addProduct(new Product("Horlicks Protein Plus", "Horlicks", "Gsk Consumer Healthcare", 535, "https://www.netmeds.com/images/product-v1/600x600/806111/horlicks_protein_plus_powder_vanilla_flavour_400_gm_pet_jar_0.jpg", 12, 0, c2.getName()));
			productService.addProduct(new Product("Nasomask N95 Anti-Pollution Mask", "Nasomask", "Nanoclean Global Pvt Ltd", 249, "https://www.netmeds.com/images/product-v1/600x600/907721/nasomask_n95_anti_pollution_mask_0_0.jpg", 18, 0, c3.getName()));
			productService.addProduct(new Product("3-Ply Disposable Surgical Face Mask 100's", "Yakhi", "Yakhi Retail", 1000, "https://www.netmeds.com/images/product-v1/600x600/912659/3_ply_disposable_surgical_face_mask_100s_0_0.jpg", 0, 0, c3.getName()));
			productService.addProduct(new Product("Floh Infrared Non-Contact Digital Thermometer", "Floh", "Shenzhen Fengrunda Technology Co Ltd", 399, "https://www.netmeds.com/images/product-v1/600x600/909826/floh_infrared_non_contact_digital_thermometer_0_0.jpg", 0, 0, c3.getName()));
			productService.addProduct(new Product("Lizol Floral Disinfectant Floor Cleaner 95ml", "Lizol", "Lizol", 179, "https://images-na.ssl-images-amazon.com/images/I/61obW%2BurxlL._SX425_.jpg", 0, 0, c1.getName()));
			productService.addProduct(new Product("Dabur Chyawanprash Awaleha 500g", "Dabur", "Heinz India Pvt Ltd", 180, "https://www.netmeds.com/images/product-v1/600x600/12748/dabur_chyawanprash_awaleha_250_gm_0.jpg", 5, 0, c2.getName()));
			productService.addProduct(new Product("Glucon-D Tangy Orange Flavour Powder 450g", "Dabur", "Heinz India Pvt Ltd", 160, "https://www.netmeds.com/images/product-v1/600x600/858116/glucon_d_orange_powder_450_gm_0.jpg", 11.4, 0, c2.getName()));
			productService.addProduct(new Product("Pediasure Nutrition Powder - Vanilla Delight Flavour 1kg", "Abbott", "Abbott Healthcare Pvt Ltd", 1240, "https://www.netmeds.com/images/product-v1/600x600/802696/pediasure_nutrition_powder_vanilla_delight_flavour_1_kg_refill_pack_0_1.jpg", 0, 0, c2.getName()));
			productService.addProduct(new Product("Dettol Soap - Intense Cool 75g", "Dettol", "Reckitt Benckiser India Ltd", 30, "https://www.netmeds.com/images/product-v1/600x600/15131/dettol_soap_cool_75_gm_0.jpg", 5, 0, c1.getName()));
			productService.addProduct(new Product("Colgate Plax Mouthwash - Peppermint 250ml", "Colgate", "Colgate Palmolive India Ltd", 120, "https://www.netmeds.com/images/product-v1/600x600/406980/colgate_plax_mouthwash_peppermint_250_ml_0.jpg", 15.6, 0, c1.getName()));
			productService.addProduct(new Product("Good Home Air Freshener 50g", "Good Home", "Ttk Healthcare Ltd", 45, "https://www.netmeds.com/images/product-v1/600x600/851335/good_home_whispers_of_passion_air_freshener_50_gm_0.jpg", 0, 0, c1.getName()));
			productService.addProduct(new Product("Accu-chek Active Glucometer Test Strips Box Of 10", "Accu-chek", "Roche Diabetes Care Inc", 1599, "https://cdn01.pharmeasy.in/dam/products_otc/000660/accu-chek-active-blood-glucometer-with-free-10-strips-1.jpg", 0, 0, c4.getName()));
			productService.addProduct(new Product("Actifiber Natural Sugar Control - 150g", "ActiFiber", "DiaBliss Consumer Products Pvt Ltd", 975, "https://cdn01.pharmeasy.in/dam/products_otc/Z11844/actifiber-natural-sugar-control-150g-1-1594968777.jpg", 14, 0, c4.getName()));
			productService.addProduct(new Product("Ensure Chocolate Diabetes Care Powder 200g", "Abbott", "Abbott Healthcare Pvt Ltd", 180, "https://cdn01.pharmeasy.in/dam/products_otc/I15536/ensure-diabetes-care-chocolate-sugar-free-refill-200gm-1.jpg", 0, 0, c4.getName()));
			productService.addProduct(new Product("Sugar Free Natura 100 Sachet Sweetener Sachets Box Of 100's", "Sugar Free", "Zyndus Wellness Ltd", 150, "https://cdn01.pharmeasy.in/dam/products_otc/164717/sugar-free-natura-100-sachet-zero-calorie-sweetener-sugar-substitute-1.jpg", 25, 0, c4.getName()));
			productService.addProduct(new Product("Dettol Instant Hand Sanitizer 60ml", "Dettol", "Reckitt Benckiser India Ltd", 30, "https://www.netmeds.com/images/product-v1/600x600/909014/dettol_instant_hand_sanitizer_60_ml_0_1.jpg", 5, 0, c3.getName()));
		}
	}

}
