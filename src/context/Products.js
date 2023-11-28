import { createContext , useState, useEffect} from "react";
import axios from "axios";

const productContext = createContext();
function Provider({children}){
  const [products, setProducts] = useState([]);

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(()=> {
    const handler = () => {
      setCurrentPath(window.location.pathname)
    };
    window.addEventListener('popstate', handler);

    return () => {
      window.removeEventListener('popstate', handler)
    };
  }, []);
  
  useEffect(()=> {
    fetchProducts();
  },[])
  
  const fetchProducts = async () => {
    const allProductsFromDb = await axios.get(process.env.REACT_APP_API_URL);
    setProducts(allProductsFromDb.data); 
  };

  const deleteProducts = async (productIds) => {
    await axios.delete(process.env.REACT_APP_API_URL ,{data: {"ids": productIds}}).then(response => {
      console.log('Response:', response);
    })
    .catch(error => {
      console.error('Error is:', error);
    });
    
    fetchProducts();
  };

  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  const handlers = {
    products,
    fetchProducts,
    deleteProducts,
    currentPath,
    navigate
  };

  return (
    <productContext.Provider value= {handlers}>
      {children}
    </productContext.Provider>
  );
}

export {Provider}
export default productContext;