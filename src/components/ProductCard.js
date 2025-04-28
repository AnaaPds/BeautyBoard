import React from "react";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} className="card-img-top" alt="Produto" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p><strong>R$ {parseFloat(product.price).toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

export default ProductCard;
