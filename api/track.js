import { readFileSync } from 'fs';
import { resolve } from 'path';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.TABLE_NAME

export default async function handler(req, res) {
  const { id = 'unknown' } = req.query;

  // Airtable Logging
  const airtableRes = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        EmailID: id,
        OpenedAt: new Date().toISOString(),
      },
    }),
  });

  // Serve tracking pixel
  const imagePath = resolve('./public/pixel.png');
  const imageBuffer = readFileSync(imagePath);

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Length', imageBuffer.length);
  res.status(200).end(imageBuffer);
}
