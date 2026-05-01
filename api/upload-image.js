import { put } from '@vercel/blob';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-password, x-filename');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const password = req.headers['x-admin-password'];
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const filename = req.headers['x-filename'] || `photo-${Date.now()}.jpg`;

  try {
    const blob = await put(`kebab/${filename}`, req, {
      access: 'public',
      contentType: req.headers['content-type'] || 'image/jpeg',
    });
    res.json({ url: blob.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur upload' });
  }
}
