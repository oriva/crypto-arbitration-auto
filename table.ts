import { GoogleSpreadsheet } from 'google-spreadsheet';
import { OAuth2Client } from 'google-auth-library';

import creds from './credentials.json'; // JSON file with your credentials

export const googleSheets = (() => {
    const sheetId = '1x7M_lPZCW9PlneaRJ6yRxsySF2_AbF1JzwhpZmXkxVM'; // The ID of the sheet can be found in the sheet's URL
    const sheet = new GoogleSpreadsheet(sheetId);

    // Authenticate with the Google Sheets API
    const oauthClient = new OAuth2Client({
        clientId: creds.web.client_id,
        clientSecret: creds.web.client_secret
    });

    // const { accessToken, refreshToken, expiryDate } = await fetchUserGoogleCredsFromDatabase();
    // oauthClient.credentials.access_token = accessToken;
    // oauthClient.credentials.refresh_token = refreshToken;
    // oauthClient.credentials.expiry_date = expiryDate;

    oauthClient.on('tokens', credentials => {
        console.log(credentials.access_token);
        console.log(credentials.scope);
        console.log(credentials.expiry_date);
        console.log(credentials.token_type); // will always be 'Bearer'
    });

    sheet.useOAuth2Client(oauthClient);

    sheet.loadInfo();
    console.log(sheet.title);

    // Get the first sheet
    // sheet.getInfo((err, info) => {
    //   const worksheet = info.worksheets[0];
    //   // Add a row of data to the sheet
    //   console.log(worksheet);
    
    // //   worksheet.addRow({ name: 'John Smith', age: 20 }, (err) => {
    // //     if (err) console.error(err);
    // //     console.log('Row added successfully.');
    // //   });
    // });

});