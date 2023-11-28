import { useContext } from "react";
import productContext from "../context/Products";

function Route ({path, children}) {
  const {currentPath} = useContext(productContext);
  if(path === currentPath){
    return children
  }
  return null;
}
export default Route