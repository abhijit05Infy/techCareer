package com.mbusa.techcareer.bean;

import org.springframework.web.multipart.MultipartFile;

public class ApplyNowDTO {
	private String programType;
	private String name;
	private String email;
	private MultipartFile file;
	
	public String getProgramType() {
		return programType;
	}
	public void setProgramType(String programType) {
		this.programType = programType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	
	

}
