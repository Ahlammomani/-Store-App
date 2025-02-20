const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 7000;

// Middleware
app.use(cors());
app.use(express.json()); 


app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

app.post("/api/products", (req, res) => {
    const { title, price, image } = req.body;
  
    if (!title || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }


    const newProduct = {
        id: Math.floor(Math.random() * 1000), 
        title,
        price,
        image,
      };
    
      res.status(201).json(newProduct);
    });






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});