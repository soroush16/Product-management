import ProductShow from "./ProductShow";
import { useContext } from "react";
import productContext from "../context/Products";
import Button from "./Button";


function ProductList () {
  const { products , deleteProducts, navigate } = useContext(productContext);
  let deleteList = [];
  const updateDeleteList = (id, selected) =>{
    if(selected && deleteList.indexOf(id) === -1){
      deleteList.push(id);
      
    }else if(!selected) {
      deleteList = deleteList.filter((number)=> {
        return number !== id
      });
    }
  };

  const handleDelete = ()=> {
    deleteProducts(deleteList);
  } 

  const handleAddClick = (event) => {
    event.preventDefault();
    navigate("/addproduct")
  }
  
  
     const renderedProducts = products.map((product)=> {
      return <ProductShow key={product.id} product= {product} onClick= {updateDeleteList}/>
    });
  
  return (
    <>
      <div className="product-list-header">
        <h1>Product List</h1>
        <div className="product-list-action">
          <Button id="add-prouducts-btn" className="add-button" onClick = {handleAddClick}>ADD</Button>
          <Button id="delete-prouducts-btn" className="delete-button" onClick={handleDelete}>MASS DELETE</Button>
        </div>
      </div>
      <hr />
      <div className="products-list-items">
        {renderedProducts}
      </div>
    </>    
  );
}
export default ProductList;