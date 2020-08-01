package com.project.easymedsauthenticationservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.easymedsauthenticationservice.services.AppUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfigurer extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private AppUserDetailsService appUserDetailsService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(appUserDetailsService).passwordEncoder(passwordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().httpBasic()
		.and()
		.authorizeRequests()
		.antMatchers("/authenticate").permitAll()
		.antMatchers(HttpMethod.GET, "/user/**").permitAll()
		.antMatchers(HttpMethod.POST, "/customer").permitAll()
		.antMatchers(HttpMethod.PUT, "/customer").authenticated()
		.antMatchers(HttpMethod.DELETE, "/customer/**").hasAnyRole("EMPLOYEE","ADMIN")
		.antMatchers(HttpMethod.GET,"/employee").hasRole("ADMIN")
		.antMatchers(HttpMethod.POST,"/employee").hasRole("ADMIN")
		.antMatchers(HttpMethod.PUT, "/employee").hasAnyRole("EMPLOYEE", "ADMIN")
		.antMatchers(HttpMethod.DELETE,"/employee/**").hasRole("ADMIN")
		.antMatchers("/manager").hasRole("ADMIN")
		.and()
		.addFilter(new JwtAuthorizationFilter(authenticationManager()))
		.logout()
		.logoutUrl("/logout");
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
}
