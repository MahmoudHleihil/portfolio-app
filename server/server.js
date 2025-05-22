const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DATA_PATH = path.join(__dirname, 'data', 'projects.json');

app.use(cors());
app.use(express.json());

function readProjects() {
  const data = fs.readFileSync(DATA_PATH);
  return JSON.parse(data);
}

function writeProjects(projects) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2));
}

// GET all projects
app.get('/api/projects', (req, res) => {
  res.json(readProjects());
});

// POST create a project
app.post('/api/projects', (req, res) => {
  const projects = readProjects();
  const newProject = { id: Date.now(), ...req.body };
  projects.push(newProject);
  writeProjects(projects);
  res.status(201).json(newProject);
});

// PUT update a project
app.put('/api/projects/:id', (req, res) => {
  let projects = readProjects();
  const id = parseInt(req.params.id);
  projects = projects.map(p => (p.id === id ? { ...p, ...req.body } : p));
  writeProjects(projects);
  res.json({ message: 'Updated successfully' });
});

// DELETE a project
app.delete('/api/projects/:id', (req, res) => {
  let projects = readProjects();
  const id = parseInt(req.params.id);
  projects = projects.filter(p => p.id !== id);
  writeProjects(projects);
  res.json({ message: 'Deleted successfully' });
});

const CONTACTS_PATH = path.join(__dirname, 'data', 'contacts.json');

// Ensure contacts.json exists
if (!fs.existsSync(CONTACTS_PATH)) fs.writeFileSync(CONTACTS_PATH, '[]');

// Contact helpers
function readContacts() {
  const data = fs.readFileSync(CONTACTS_PATH);
  return JSON.parse(data);
}

function writeContacts(contacts) {
  fs.writeFileSync(CONTACTS_PATH, JSON.stringify(contacts, null, 2));
}

// POST contact submission
app.post('/api/contact', (req, res) => {
  const contacts = readContacts();
  const newMessage = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    timestamp: new Date().toISOString(),
  };
  contacts.push(newMessage);
  writeContacts(contacts);
  res.status(201).json({ message: 'Message received successfully', newMessage });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
