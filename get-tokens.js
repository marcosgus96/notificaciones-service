const { google } = require('googleapis');
const readline = require('readline');

import * as dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN; // Dejar en blanco por ahora

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://mail.google.com/'],
  });
  console.log('Autoriza esta aplicación visitando esta URL:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Ingresa el código de la página de autorización: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, tokens) => {
      if (err) return console.error('Error al obtener el token de acceso', err);
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token);
    });
  });
}

getAccessToken();
