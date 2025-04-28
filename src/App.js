import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import localStorageService from './services/localStorageService';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorageService.getProducts();
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, []);

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorageService.saveProducts(updatedProducts);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorageService.saveProducts(updatedProducts);
  };

  const handleDeleteProduct = (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);
    setProducts(filteredProducts);
    localStorageService.saveProducts(filteredProducts);
  };

  return (
    <Home
      products={products}
      onAdd={handleAddProduct}
      onUpdate={handleUpdateProduct}
      onDelete={handleDeleteProduct}
    />
  );
}

export default App;
