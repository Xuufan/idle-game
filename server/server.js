const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3002;
const DATA_PATH = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.post('/save', (req, res) => {
  const { userId, gameState } = req.body;
  const data = fs.existsSync(DATA_PATH) ? JSON.parse(fs.readFileSync(DATA_PATH)) : {};
  data[userId] = gameState;
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json({ status: 'saved' });
});

app.get('/load/:userId', (req, res) => {
  const data = fs.existsSync(DATA_PATH) ? JSON.parse(fs.readFileSync(DATA_PATH)) : {};
  const state = data[req.params.userId] || null;
  res.json({ gameState: state });
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
