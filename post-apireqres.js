const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Define the POST /post-api endpoint
app.post('/post-api', (req, res) => {
  // Get the "query" value from the request body
  const queryParam = req.body.query;

  // Check if the "query" is provided in the request body
  if (queryParam) {
    res.json({ res: queryParam });  // Return the same query parameter in the response
  } else {
    res.status(400).json({ error: 'Request body must contain a "query" field' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
