import React, { useState, useEffect } from "react";
import axios from "axios";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load products");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {products.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                        <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
                        <h4>{product.title}</h4>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
