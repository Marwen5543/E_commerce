import React from "react";

const ProductDetails = ({ product, onClose }) => {
  return (
    <div className="product-details">
      <h2>Product Details</h2>
      <p><strong>Title:</strong> {product.libelle}</p>
      <p><strong>quantite:</strong> {product.quantite}</p>
      <p><strong>Price:</strong> ${product.prix}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ProductDetails;
