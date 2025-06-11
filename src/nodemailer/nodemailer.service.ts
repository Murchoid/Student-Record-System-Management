import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodemailerService {
  constructor(private readonly configService: ConfigService) {}

  async sendOtpEmail(otp: string, email: string) {
    const emailUser = this.configService.getOrThrow<string>('EMAIL_USER');
    const emailPass = this.configService.getOrThrow<string>('EMAIL_PASS');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const otpMessage = `
      <h3>Password Change Request</h3>
      <p>Your temporary password is: <b>${otp}</b></p>
      <p>This code will expire in 10 minutes.</p>
    `;

    const mailOptions = {
      from: `"Student Record System" <srms@gmail.com>`,
      to: email,
      subject: 'Password change!',
      html: otpMessage,
    };

    try {
      const response = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', response.messageId);
      return response;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(email) {
    const emailUser = this.configService.getOrThrow<string>('EMAIL_USER');
    const emailPass = this.configService.getOrThrow<string>('EMAIL_PASS');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const welcomeMessage = `
      <div style="font-family: Arial, sans-serif; background: #f6fff8; padding: 24px; border-radius: 8px; border: 1px solid #d4f5e9;">
      <h2 style="color: #218838;">Sign in to Student Record System!</h2>
      <p style="color: #155724;">Dear user,</p>
      <p style="color: #155724;">
        Someone signed in to your account, if this is not you, ruuun foor your account.
      </p>
      <p style="color: #155724;">
        If it is you, oh well hello world!
      </p>
      <p style="color: #155724;">
        If you have any questions or need assistance, feel free to reach out to our support team(pls dont).
      </p>
      <br/>
      <p style="color: #218838;">
        Best regards,<br/>
        <span style="font-weight: bold;">The Student Record System Team</span>
      </p>
      </div>
    `;

    const mailOptions = {
      from: `"Student Record System" <srms@gmail.com>`,
      to: email,
      subject: 'Welcome to Student Record System!',
      html: welcomeMessage,
    };

    try {
      const response = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', response.messageId);
      return response;
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  }
}
