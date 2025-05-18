const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let gameState = {};

async function loadState() {
  try {
    const data = await fs.readFile('save.json');
    gameState = JSON.parse(data);
  } catch (err) {
    // Initialize default state if no save file exists
    gameState = {
      minerals: 0,
      baseRate: 1,
      miners: 0,
      minerCost: 10,
      achievements: { first100: false, firstMiner: false }
    };
  }
}

// ... rest of server code remains the same ...

// Serve front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  loadState();
});