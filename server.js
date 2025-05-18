const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Example API endpoint
app.post("/save", (req, res) => {
  // Handle saving game state here
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});