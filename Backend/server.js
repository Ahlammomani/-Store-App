const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());


app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
