import dotenv from 'dotenv';
import { google } from 'googleapis';
import path from 'path';

dotenv.config();

const DEFAULT_SHEET_ID = '1_H-OIoLXyxbGsr7gezxc2AbpnUEaVidb-WRjTGFXRfQ';

function getWriteSheets() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentials) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON not set in .env');
  }

  const key = JSON.parse(credentials);
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

async function run() {
  try {
    const targetSheetId = process.env.GOOGLE_LATEST_BILL_SHEET_ID || DEFAULT_SHEET_ID;
    console.log('Sheet ID:', targetSheetId);
    
    const sheets = getWriteSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: targetSheetId,
      range: 'Masterlist',
    });

    const values = response.data.values || [];
    if (values.length === 0) {
      console.log('No data found in Masterlist sheet.');
      return;
    }

    const [headers, ...rows] = values;
    console.log('Headers:', headers);

    const targetCode = '19575';
    const codeIndex = headers.findIndex(h => h && h.toUpperCase() === 'CONSCODE');
    
    if (codeIndex === -1) {
      console.log('CONSCODE header not found. Columns are:', headers);
      return;
    }

    const matches = rows.filter(row => {
      const rowCode = String(row[codeIndex] || '').trim();
      if (rowCode === targetCode) return true;
      const rowNum = parseInt(rowCode, 10);
      const targetNum = parseInt(targetCode, 10);
      return !isNaN(rowNum) && !isNaN(targetNum) && rowNum === targetNum;
    });

    if (matches.length === 0) {
      console.log(`No records found matching conscode ${targetCode}.`);
      return;
    }

    console.log(`Found ${matches.length} matching record(s):`);
    matches.forEach((match, idx) => {
      console.log(`Match #${idx + 1}:`);
      headers.forEach((header, colIdx) => {
        console.log(`  ${header}: ${match[colIdx] || ''}`);
      });
    });
  } catch (err) {
    console.error('Error querying sheet:', err.message);
  }
}

run();
