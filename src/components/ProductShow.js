function ProductShow( { product , onClick}) {
  
  const handleClick = (event) => {
      onClick(product.id, event.target.checked);
  };

  return (
    <div className="product">
      <input id=".delete-checkbox" type="checkbox" name="item" className="delete-checkbox" onClick={handleClick} ></input>
      <div className="product-details">
        <p>{product.sku}</p>
        <p>{product.name}</p>
        <p>{product.price} $</p>
        <p>
          {product.type === "Book" && <p>Weight: {product.weight}</p>}
          {product.type === "Dvd" && <p>Size: {product.size}</p>}
          {product.type === "Furniture" && <p>Dimensions: {product.length}x{product.height}x{product.width}</p>}
        </p>
      </div>
    </div>   
  );
}

export default ProductShow;