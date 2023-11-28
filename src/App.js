import { useContext, useEffect } from "react";
import productContext from "./context/Products";
import ProductList from "./components/ProductList";
import Route from "./components/Route";
import AddProduct from "./components/AddProduct";

function App() {
  const { fetchProducts } = useContext(productContext);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  

  return (
    <div>
      <div>
        <Route path = "/">
        <ProductList />
        </Route>
      </div>
        
      <div>
        <Route path = "/addproduct">
          <AddProduct/>
        </Route>
      </div>
    </div>
  );
}

export default App;