import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const projects = [
  { id: 1, title: "Project A", description: "Description A" },
  { id: 2, title: "Project B", description: "Description B" }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/', (req, res) => {
  res.send('Portfolio API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
