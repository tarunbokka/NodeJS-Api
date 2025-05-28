const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Define the /info-from-file endpoint
app.get('/info-from-file', (req, res) => {
  // Define the path to the JSON file
  const filePath = path.join(__dirname, 'sampledata.json');

  // Read the JSON file asynchronously
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read the file' });
    }

    try {
      // Parse the JSON data and send it as the response
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to parse JSON' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
