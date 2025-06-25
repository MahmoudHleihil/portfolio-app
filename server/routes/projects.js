const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { user_id = 1, title, description, link } = req.body;
  await db.query('INSERT INTO projects (user_id, title, description, link) VALUES (?, ?, ?, ?)', [user_id, title, description, link]);
  res.status(201).json({ message: 'Project added' });
});

router.put('/:id', async (req, res) => {
  const { title, description, link } = req.body;
  await db.query('UPDATE projects SET title=?, description=?, link=? WHERE id=?', [title, description, link, req.params.id]);
  res.json({ message: 'Project updated' });
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM projects WHERE id=?', [req.params.id]);
  res.json({ message: 'Project deleted' });
});

module.exports = router;
