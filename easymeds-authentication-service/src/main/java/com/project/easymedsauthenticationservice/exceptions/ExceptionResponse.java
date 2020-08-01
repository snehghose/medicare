package com.project.easymedsauthenticationservice.exceptions;

import java.time.LocalDateTime;

public class ExceptionResponse {
	
	private LocalDateTime timestamp;
	private String message;
	private String error;
	
	public ExceptionResponse(LocalDateTime timestamp, String message, String error) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.error = error;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
	
	

}
