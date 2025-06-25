const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  await db.query('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
  res.status(201).json({ message: 'Message received' });
});

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
  res.json(rows);
});

module.exports = router;
