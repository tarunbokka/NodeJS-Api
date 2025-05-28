/* const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create an instance of the express app
const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Load the shopping list data from a file
const filePath = path.join(__dirname, 'shoppingList.json');

// Read shopping list data from the JSON file
function getShoppingList() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    return { shoppingList: { groceries: [], personalCare: [], householdItems: [] } };
  }
}

// Write shopping list data to the JSON file
function writeShoppingList(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Add an item to the list
app.post('/add', (req, res) => {
  const { category, item } = req.body;

  if (!category || !item) {
    return res.status(400).json({ error: 'Category and item are required' });
  }

  const data = getShoppingList();
  const categoryList = data.shoppingList[category];

  if (!categoryList) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  categoryList.push({ item, quantity: 1, unit: 'unit' }); // Default quantity and unit
  writeShoppingList(data);

  res.status(200).json({ message: 'Item added successfully', data: categoryList });
});

// Update an item in the list
app.post('/update', (req, res) => {
  const { category, item, newValue } = req.body;

  if (!category || !item || !newValue) {
    return res.status(400).json({ error: 'Category, item, and newValue are required' });
  }

  const data = getShoppingList();
  const categoryList = data.shoppingList[category];

  if (!categoryList) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const itemIndex = categoryList.findIndex(i => i.item === item);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  categoryList[itemIndex].item = newValue;
  writeShoppingList(data);

  res.status(200).json({ message: 'Item updated successfully', data: categoryList });
});

// Delete an item from the list
app.post('/delete', (req, res) => {
  const { category, item } = req.body;

  if (!category || !item) {
    return res.status(400).json({ error: 'Category and item are required' });
  }

  const data = getShoppingList();
  const categoryList = data.shoppingList[category];

  if (!categoryList) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  const itemIndex = categoryList.findIndex(i => i.item === item);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  categoryList.splice(itemIndex, 1);
  writeShoppingList(data);

  res.status(200).json({ message: 'Item deleted successfully', data: categoryList });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 */
//----------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create an instance of the express app
const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Path to the shoppingList JSON file
const filePath = path.join(__dirname, 'sampledata.json');

// Read shopping list data from the JSON file
function getShoppingList() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    return { shoppingList: { groceries: [], personalCare: [], householdItems: [] } };
  }
}

// Write shopping list data to the JSON file
function writeShoppingList(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ADD - Add an item to the shopping list
app.post('/add', (req, res) => {
  const { shoppingList, item } = req.body;

  if (!shoppingList || !item) {
    return res.status(400).json({ error: 'shoppingList and item are required' });
  }

  const data = getShoppingList();
  const categoryList = data.shoppingList[shoppingList];

  if (!categoryList) {
    return res.status(400).json({ error: 'Invalid shopping list category' });
  }

  // Only add the item name without quantity and unit
  categoryList.push({ item });
  writeShoppingList(data);

  res.status(200).json({ message: 'Item added successfully', data: categoryList });
});

// UPDATE - Update an item in the shopping list
app.post('/update', (req, res) => {
  const { shoppingList, item, newItem } = req.body;

  if (!shoppingList || !item || !newItem) {
    return res.status(400).json({ error: 'shoppingList, item, and newItem are required' });
  }

  const data = getShoppingList();
  const categoryList = data.shoppingList[shoppingList];

  if (!categoryList) {
    return res.status(400).json({ error: 'Invalid shopping list category' });
  }

  const itemIndex = categoryList.findIndex(i => i.item === item);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  categoryList[itemIndex].item = newItem; // Update the item name
  writeShoppingList(data);

  res.status(200).json({ message: 'Item updated successfully', data: categoryList });
});

// DELETE - Delete an item from the shopping list
app.post('/delete', (req, res) => {
  const { shoppingList, item } = req.body;

  if (!shoppingList || !item) {
    return res.status(400).json({ error: 'shoppingList and item are required' });
  }

  const data = getShoppingList();
  const categoryList = data.shoppingList[shoppingList];

  if (!categoryList) {
    return res.status(400).json({ error: 'Invalid shopping list category' });
  }

  const itemIndex = categoryList.findIndex(i => i.item === item);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  categoryList.splice(itemIndex, 1); // Delete the item
  writeShoppingList(data);

  res.status(200).json({ message: 'Item deleted successfully', data: categoryList });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
