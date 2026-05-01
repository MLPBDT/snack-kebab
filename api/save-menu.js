import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  let body = req.body;

  // Sécurité : parse manuel si body est une string
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'JSON invalide' }); }
  }

  const { password, checkOnly, siteData, menu, compose } = body || {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  if (checkOnly) return res.json({ ok: true });

  try {
    const dataToSave = siteData || { menu, compose };

    // Vérification taille (Upstash free = 1MB max par valeur)
    const json = JSON.stringify(dataToSave);
    if (json.length > 900000) {
      return res.status(413).json({ error: 'Données trop volumineuses (limite 900KB). Réduisez le nombre de photos.' });
    }

    await kv.set('snack-data', dataToSave);
    res.json({ ok: true });
  } catch (err) {
    console.error('KV save error:', err);
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
}
