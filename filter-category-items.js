/* const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Define the /info-from-file endpoint for the POST method
app.post('/info-from-file', (req, res) => {
  // Get the shopping list and filter item from the request body
  const { shoppingList, filterItem } = req.body;

  // Check if both "shoppingList" and "filterItem" are provided
  if (!shoppingList || !filterItem) {
    return res.status(400).json({ error: 'Both "shoppingList" and "filterItem" are required' });
  }

  // Define the path to the JSON file
  const filePath = path.join(__dirname, 'sampledata.json');

  // Read the JSON file asynchronously
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read the file' });
    }

    try {
      // Parse the JSON data from the file
      const jsonData = JSON.parse(data);

      // Find the shopping list data for the provided shopping list
      const listData = jsonData[shoppingList];

      // If no data for the shopping list, return an error
      if (!listData) {
        return res.status(404).json({ error: `Shopping list "${shoppingList}" not found` });
      }

      // Filter the items in the list based on the filterItem
      const filteredItems = listData.filter(item => item === filterItem);

      // If no matching items, return an error
      if (filteredItems.length === 0) {
        return res.status(404).json({ error: `No matching items found for "${filterItem}"` });
      }

      // Return the filtered items as the response
      res.json({ item: filteredItems });

    } catch (err) {
      return res.status(500).json({ error: 'Failed to parse JSON' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 */


//---------------------------------------
/* const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Define the /info-from-file endpoint for the POST method
app.post('/info-from-file', (req, res) => {
  const { shoppingList, filterItem } = req.body;

  // Check if both "shoppingList" and "filterItem" are provided
  if (!shoppingList || !filterItem) {
    return res.status(400).json({ error: 'Both "shoppingList" and "filterItem" are required' });
  }

  // Define the path to the JSON file
  const filePath = path.join(__dirname, 'sampledata.json');

  // Read the JSON file asynchronously
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read the file' });
    }

    try {
      // Parse the JSON data from the file
      const jsonData = JSON.parse(data);

      // Find the shopping list data for the provided shopping list
      const listData = jsonData[shoppingList];

      // If no data for the shopping list, return an error
      if (!listData) {
        return res.status(404).json({ error: `Shopping list "${shoppingList}" not found` });
      }

      // Filter the items in the list based on the filterItem
      const filteredItems = listData.filter(item => item.item === filterItem);

      // If no matching items, return an error
      if (filteredItems.length === 0) {
        return res.status(404).json({ error: `No matching items found for "${filterItem}"` });
      }

      // Return the filtered items as the response
      res.json(filteredItems);

    } catch (err) {
      return res.status(500).json({ error: 'Failed to parse JSON' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 */

//--------------------------------------------------------
//filtercategory
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Read the local JSON file
const shoppingData = JSON.parse(fs.readFileSync('sampledata.json', 'utf-8'));

// POST route to filter data
app.post('/info-from-file', (req, res) => {
  const { shoppingList, filterItem } = req.body;

  // Check if both required fields are provided
  if (!shoppingList || !filterItem) {
    return res.status(400).json({ error: 'Both shoppingList and filterItem must be provided.' });
  }

  // Check if the shopping list exists in the data
  const listData = shoppingData.shoppingList[shoppingList];
  if (!listData) {
    return res.status(400).json({ error: `No data found for shopping list: ${shoppingList}` });
  }

  // Filter items based on the provided filterItem
  const filteredItem = listData.find(item => item.item.toLowerCase() === filterItem.toLowerCase());

  // If no matching item found
  if (!filteredItem) {
    return res.status(404).json({ error: `Item '${filterItem}' not found in ${shoppingList}.` });
  }

  // Return the filtered item
  return res.json(filteredItem);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
