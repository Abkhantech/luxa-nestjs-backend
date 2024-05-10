import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILER_FROM_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(to: string, body: string) {
    await this.transporter.sendMail({
      from: process.env.MAILER_FROM_EMAIL,
      to,
      subject: 'LUXA email-verification',
      html: body,
    });
  }
}
