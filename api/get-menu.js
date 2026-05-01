import { kv } from '@vercel/kv';

const DEFAULT_MENU = {
  kebabs: [
    { id: 'k1', name: 'Kebab Classique', desc: 'Pain pita, viande de veau, salade, tomate, oignon, sauce blanche', price: 7.5, tag: 'Best-seller' },
    { id: 'k2', name: 'Kebab Galette', desc: 'Galette grillée, viande de poulet, crudités, sauce algérienne', price: 8, tag: 'Épicé' },
    { id: 'k3', name: 'Kebab Assiette', desc: 'Frites maison, viande, salade, sauces au choix', price: 11, tag: 'XL' },
    { id: 'k4', name: 'Kebab Falafel', desc: 'Pita, falafels maison, houmous, crudités, sauce yaourt', price: 7, tag: 'Végé' },
  ],
  burgers: [
    { id: 'b1', name: 'Cheese Snack', desc: 'Steak haché, cheddar, oignons confits, sauce maison', price: 8.5, tag: '' },
    { id: 'b2', name: 'Double Bacon', desc: 'Double steak, bacon grillé, cheddar fondu, salade', price: 10.5, tag: '' },
    { id: 'b3', name: 'Chicken Crispy', desc: 'Poulet pané croustillant, coleslaw, sauce barbecue', price: 9, tag: '' },
  ],
  tacos: [
    { id: 't1', name: 'Tacos M', desc: '1 viande, frites, fromage fondu, sauce', price: 7, tag: '' },
    { id: 't2', name: 'Tacos L', desc: '2 viandes, frites, fromage fondu, sauce', price: 9, tag: '' },
    { id: 't3', name: 'Tacos XL', desc: '3 viandes, frites, double fromage, sauce', price: 11, tag: '' },
  ],
  sides: [
    { id: 's1', name: 'Frites maison', desc: 'Coupées sur place, double cuisson', price: 3.5, tag: '' },
    { id: 's2', name: 'Nuggets x6', desc: 'Poulet pané, sauce au choix', price: 4.5, tag: '' },
    { id: 's3', name: 'Onion rings', desc: '6 pièces, sauce barbecue', price: 4, tag: '' },
    { id: 's4', name: 'Mozza sticks x4', desc: 'Bâtonnets de mozza panés, sauce tomate', price: 5, tag: '' },
  ],
};

const DEFAULT_COMPOSE = [
  { key: 'pain', label: 'Le pain', options: ['Pita', 'Galette', 'Pain libanais', 'Sans pain (assiette)'] },
  { key: 'viande', label: 'La viande', options: ['Veau', 'Poulet', 'Mixte', 'Falafel (végé)'] },
  { key: 'crudites', label: 'Les crudités', options: ['Salade', 'Tomate', 'Oignon', 'Cornichons', 'Tout'] },
  { key: 'sauce', label: 'Les sauces (max 2)', options: ['Blanche', 'Algérienne', 'Samouraï', 'Barbecue', 'Harissa', 'Curry', 'Andalouse'], multi: 2 },
  { key: 'extra', label: 'Suppléments', options: ['Cheddar +1€', 'Bacon +1.5€', 'Œuf +1€', 'Frites dedans +1€'], multi: 4 },
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const data = await kv.get('snack-data');
    if (data) {
      res.json(data);
    } else {
      res.json({ menu: DEFAULT_MENU, compose: DEFAULT_COMPOSE });
    }
  } catch (err) {
    console.error(err);
    res.json({ menu: DEFAULT_MENU, compose: DEFAULT_COMPOSE });
  }
}

