/* const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Read the shopping list from the JSON file
const getShoppingList = () => {
  const data = fs.readFileSync('sampledata.json');
  return JSON.parse(data);
};

// Write the shopping list to the JSON file
const saveShoppingList = (shoppingList) => {
  fs.writeFileSync('shoppingList.json', JSON.stringify(shoppingList, null, 2));
};

// Add item to the shopping list
app.post('/add', (req, res) => {
  const { shoppingList, item, quantity, unit } = req.body;
  const data = getShoppingList();
  
  if (shoppingList && item && quantity && unit) {
    // Add the new item to the correct section of the shopping list
    const section = data.shoppingList[shoppingList];
    section.push({ item, quantity, unit });

    // Save the updated shopping list
    saveShoppingList(data);
    return res.status(200).json({ message: 'Item added successfully!' });
  } else {
    return res.status(400).json({ error: 'Missing required fields' });
  }
});

// Update item in the shopping list
app.post('/update', (req, res) => {
  const { shoppingList, item, newItem, newquantity, newunit } = req.body;
  const data = getShoppingList();
  
  if (shoppingList && item && newItem && newquantity && newunit) {
    const section = data.shoppingList[shoppingList];
    const index = section.findIndex(i => i.item === item);
    
    if (index !== -1) {
      section[index] = {
        item: newItem,
        quantity: newquantity,
        unit: newunit
      };

      saveShoppingList(data);
      return res.status(200).json({ message: 'Item updated successfully!' });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } else {
    return res.status(400).json({ error: 'Missing required fields' });
  }
});

// Delete item from the shopping list
app.post('/delete', (req, res) => {
  const { shoppingList, item } = req.body;
  const data = getShoppingList();
  
  if (shoppingList && item) {
    const section = data.shoppingList[shoppingList];
    const index = section.findIndex(i => i.item === item);
    
    if (index !== -1) {
      section.splice(index, 1); // Remove the item from the array
      saveShoppingList(data);
      return res.status(200).json({ message: 'Item deleted successfully!' });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } else {
    return res.status(400).json({ error: 'Missing required fields' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
 */
//-------------------------------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Read the shopping list from the JSON file
const getShoppingList = () => {
  const data = fs.readFileSync('sampledata.json');
  return JSON.parse(data);
};

// Write the shopping list to the JSON file
const saveShoppingList = (shoppingList) => {
  fs.writeFileSync('sampledata.json', JSON.stringify(shoppingList, null, 2));
};

// Add item to the shopping list
app.post('/add', (req, res) => {
  const { shoppingList, item, quantity, unit } = req.body;
  const data = getShoppingList();
  
  if (shoppingList && item && quantity && unit) {
    const section = data.shoppingList[shoppingList];
    section.push({ item, quantity, unit });

    saveShoppingList(data);
    
    return res.status(200).json({
      message: "Item added successfully",
      data: data.shoppingList[shoppingList]
    });
  } else {
    return res.status(400).json({ error: 'Missing required fields' });
  }
});

// Update item in the shopping list
app.post('/update', (req, res) => {
  const { shoppingList, item, newItem, newquantity, newunit } = req.body;
  const data = getShoppingList();
  
  if (shoppingList && item && newItem && newquantity && newunit) {
    const section = data.shoppingList[shoppingList];
    const index = section.findIndex(i => i.item === item);
    
    if (index !== -1) {
      section[index] = {
        item: newItem,
        quantity: newquantity,
        unit: newunit
      };

      saveShoppingList(data);
      return res.status(200).json({
        message: "Item updated successfully",
        data: data.shoppingList[shoppingList]
      });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } else {
    return res.status(400).json({ error: 'Missing required fields' });
  }
});

// Delete item from the shopping list
app.post('/delete', (req, res) => {
  const { shoppingList, item } = req.body;
  const data = getShoppingList();
  
  if (shoppingList && item) {
    const section = data.shoppingList[shoppingList];
    const index = section.findIndex(i => i.item === item);
    
    if (index !== -1) {
      section.splice(index, 1); // Remove the item from the array
      saveShoppingList(data);
      return res.status(200).json({
        message: "Item deleted successfully",
        data: data.shoppingList[shoppingList]
      });
    } else {
      return res.status(404).json({ error: 'Item not found' });
    }
  } else {
    return res.status(400).json({ error: 'Missing required fields' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
