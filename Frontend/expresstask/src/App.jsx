import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: "", price: "", image: "" });

  
  useEffect(() => {
    axios.get("http://localhost:7000/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);


  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/api/products", newProduct);
      setProducts([...products, response.data]); 
      setNewProduct({ title: "", price: "", image: "" }); 
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };















  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Store Products</h1>

   
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

    
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "20px" }}>
          {products.map(product => (
            <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
              <img src={product.image} alt={product.title} style={{ width: "100px", height: "100px" }} />
              <h3>{product.title}</h3>
              <p>{product.price} $</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;