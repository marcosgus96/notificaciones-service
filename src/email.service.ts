import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
  private oauth2Client;

  constructor() {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    this.oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI,
    );

    this.oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      const accessToken = await this.oauth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.CORREO_GMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken?.token as string,
        },
      });

      const mailOptions = {
        from: `${process.env.NOMBRE_REMITENTE} <${process.env.CORREO_GMAIL}>`,
        to,
        subject,
        text,
      };

      const result = await transport.sendMail(mailOptions);
      console.log('Correo enviado:', result);
      return result;
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}
