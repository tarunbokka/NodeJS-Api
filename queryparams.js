const express = require('express');
const app = express();
const port = 3000;

// Define the /post-api endpoint that takes a query parameter
app.get('/post-api', (req, res) => {
  // Get the query parameter named "query" from the request
  const queryParam = req.query.query;

  // If query is provided, return it in the response
  if (queryParam) {
    res.json({ query: queryParam });
  } else {
    res.status(400).json({ error: 'Query parameter "query" is required' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
