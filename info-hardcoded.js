const express = require('express');
const app = express();
const port = 3000;

// Define the /info-hardcoded endpoint
app.get('/info-hardcoded', (req, res) => {
  res.json({ res: "Connected to nodejs app" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
