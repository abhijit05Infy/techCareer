package com.mbusa.techcareer.service;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.TemplateProcessingParameters;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.TemplateResolution;

import com.mbusa.techcareer.bean.ContactUs;

@Service
public class EmailSender {

	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private TemplateEngine templateEngine;

	@Value("${techcareer.contus.subline}")
	private String contUsSubline;

	@Value("${techcareer.applynow.subline}")
	private String applyNowSubline;

	@Value("${techcareer.contus.frommail}")
	private String contUsFrommail;

	@Value("${techcareer.applynow.frommail}")
	private String applyNowFrommail;

	public void prepareAndSendContactUs(ContactUs contactUs) throws Exception {
		System.out.println("EmailSender.prepareAndSendContactUs()");
		final Context ctx = new Context();
		ctx.setVariable("name", contactUs.getName());
		ctx.setVariable("email", contactUs.getEmail());
		ctx.setVariable("phoneNumber", contactUs.getPhoneNumber());
		ctx.setVariable("state", contactUs.getState());
		ctx.setVariable("inquiry", contactUs.getInquiry());

		final String inquiryEmail = this.templateEngine.process("inquiry", ctx);
		final String thanksEmail = this.templateEngine.process("inqueryThanks",
				ctx);
		/*
		 * if(true){ throw new Exception(); }
		 */
		System.out.println("contactUs.getEmail()" + contactUs.getEmail());

		System.out.println("contUsFrommail" + contUsFrommail);
		try {
			sendEmail(thanksEmail, contUsSubline, contUsFrommail,
					contactUs.getEmail(), null);
			sendEmail(inquiryEmail, contUsSubline, contactUs.getEmail(),
					contUsFrommail, null);
		} catch (MailException mailEx) {
			System.out.println("Exception -" + mailEx.getMessage()
					+ " occured while sending email");
			throw mailEx;
		}

	}

	private void sendEmail(String htmlContent, String subjectLine,
			String frmEmail, String toEmail, MultipartFile file)
			throws MailException, MessagingException {

		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(
					mimeMessage, true);
			messageHelper.setFrom(frmEmail);
			messageHelper.setTo(toEmail);
			messageHelper.setSubject(subjectLine);
			messageHelper.setText(htmlContent, true);
			if (file != null) {
				messageHelper.addAttachment(file.getOriginalFilename(), file);

			}
		};

		javaMailSender.send(messagePreparator);
	}

	public void prepareAndUploadResume(MultipartFile file, String userName,
			String email, String programType) throws MailException,
			MessagingException {

		System.out.println("EmailSender.sendResume()");

		final Context ctx = new Context();
		ctx.setVariable("programType", programType);
		ctx.setVariable("name", userName);
		ctx.setVariable("email", email);

		final String uploadResume = this.templateEngine.process("inquiry", ctx);
		final String thanksEmail = this.templateEngine.process("inqueryThanks",
				ctx);

		try {
			sendEmail(thanksEmail, applyNowSubline + " " + userName,
					contUsFrommail, email, null);
			sendEmail(uploadResume, applyNowSubline + " " + userName, email,
					applyNowFrommail, file);
		} catch (MailException mailEx) {
			System.out.println("Exception -" + mailEx.getMessage()
					+ " occured while sending email");
			throw mailEx;
		} catch (MessagingException messagingException) {
			System.out.println("Exception -" + messagingException.getMessage()
					+ " occured while sending email");
			throw messagingException;
		}

	}

}
