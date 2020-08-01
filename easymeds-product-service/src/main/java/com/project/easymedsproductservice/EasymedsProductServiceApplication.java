package com.project.easymedsproductservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class EasymedsProductServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EasymedsProductServiceApplication.class, args);
	}

}
