package com.mbusa.techcareer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mbusa.techcareer.bean.ContactUs;
import com.mbusa.techcareer.service.EmailSender;

@RestController
@RequestMapping("/service/")
public class TechCareerController {

	@Autowired
	private EmailSender emailSender;

	@PostMapping(value = "sendContactUsEmail", produces = "application/json")
	@ResponseStatus
	public ResponseEntity sendContactUsEmail(@RequestBody ContactUs contactUs)
			throws Exception {

		System.out.println("sendContactUsEmail() :: Email :"
				+ contactUs.getEmail());

		System.out.println("Inquiry :" + contactUs.getInquiry());
		System.out.println("Name :" + contactUs.getName());
		System.out.println("Phone Number :" + contactUs.getPhoneNumber());
		System.out.println("State :" + contactUs.getState());

		emailSender.prepareAndSendContactUs(contactUs);

		return ResponseEntity.ok("Successfully sent an email");
	}

	@PostMapping(value = "sendApplynow", produces = "application/json")
	@ResponseStatus
	public ResponseEntity sendApplynow(
			@RequestParam("file") MultipartFile file,
			@RequestParam("userName") String userName,
			@RequestParam("email") String email,
			@RequestParam("programType") String programType) throws Exception {

		System.out.println("Uploaded File :" + file.getOriginalFilename()
				+ " File size :" + file.getSize());

		emailSender.prepareAndUploadResume(file, userName, email, programType);

		return ResponseEntity.ok("Your Resume Uploaded successfully");

	}

}
