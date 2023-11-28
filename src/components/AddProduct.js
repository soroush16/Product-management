import { useState, useContext} from "react";
import productContext from "../context/Products";
import axios from "axios";


function AddProduct(){
  const { navigate, fetchProducts }= useContext(productContext)
  const [selected , setSelected]= useState('');
  const [errors, setErrors] = useState({});
  const [inputValues, setInputValues]= useState({
    sku:"",
    name:"",
    price: 0,
    weight:"",
    size: "",
    height:"",
    width:"",
    length:""
  });

  const handleInputChange = (event)=> {
    
    setInputValues({
      ...inputValues,
      [event.target.id]: event.target.value
    });
  };

  const handleTypeChange = (event) => {
    const getType = event.target.value;
    setSelected(getType);
  };

  

  const validateInputValues = (inputFields) => {
    let inputErrors = {};
    const regex = /^\d+(\.\d{1,2})?$/;
    if(typeof(inputFields.name) !== "string"){
      inputErrors.name = "please enter a name";
    }
    if(!regex.test(inputFields.price)){
      
      inputErrors.price = "please enter a positive number up to two decimals for price";
      console.log(inputErrors.price);
    }
    if(!regex.test(inputFields.weight) && inputFields.weight!== ''){
      inputErrors.weight = "please enter a number for weight";
    }
    if(!regex.test(inputFields.size) && inputFields.size!== '' ){
      inputErrors.size = "please enter a number for size";
    }
    if(!regex.test(inputFields.height) && inputFields.height!== '' ){
      inputErrors.height = "please enter a number for higth";
    }
    if(!regex.test(inputFields.width) && inputFields.width!== '' ){
      inputErrors.width = "please enter a number for width";
    }
    if(!regex.test(inputFields.length) && inputFields.length!== '' ){
      inputErrors.length = "please enter a number for length";
    }
    console.log(inputErrors);
    return inputErrors;
  };

  const handleCancelClick = (event) =>{ 
    event.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(prevErrors => {
      const newErrors = validateInputValues(inputValues);
      if (Object.keys(newErrors).length === 0) {
  
        const makeRequest = async () => {
          try {
            const response = await axios.post(process.env.REACT_APP_API_URL, {
              type: selected,
              values: inputValues
            }).catch(error => {
              console.error('Error in Add is:', error);
            });
            console.log('product created', response.data);
            fetchProducts();
            navigate("/");
            console.log(response);
          } catch (error) {
            if (error.response.status === 409) {
              console.log('SKU already exists!');
              console.log('Server responded with error status', error.response.status);
              console.log('Error data:', error.response.data);
            } else if (error.request) {
              console.log('Request made but no response received');
            } else {
              console.log('Error occurred while setting up the request', error.message);
            }
          }
        };
  
        makeRequest();
      }
      return newErrors;
    });
  };
  
  
  
  return(
    <div className="product_list">
      <form id="product_form" onSubmit={handleSubmit}>
        <div className="product-list-header">
          <h1>Product Add</h1>
          <div className="product-list-action">
            <button type="submit" className="add-button" disabled= {selected === ''}> Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>

        </div>
      <hr />
          <div className="product-form-section">
            <div className="products-add-group">
              <label >SKU</label>
              <input id="sku" type="text" value={inputValues.sku} onChange={(event)=> handleInputChange(event)} required />
              <small>Please provide a unique SKU number</small>
            </div>
            <div className="products-add-group">
                <label>Name</label>
                <input id="name" type="text" value={inputValues.name} onChange={(event)=> handleInputChange(event)} required/>                    
                <small>Please provide product name</small>                   
            </div>
            {errors.name ? <p className="error-message">{errors.name}</p> : null}
            <div className="products-add-group">
                <label>Price ($)</label>
                <input id="price" type="text"  value={inputValues.price} onChange={(event)=> handleInputChange(event)} required/>                   
                <small>Please provide product price</small>                   
            </div>
            {errors.price ? <small className="error-message">{errors.price}</small> : null}
              
          </div>
            <div className="product-form-section">
              <div className="products-add-group">
                  <label>Type Switcher</label>
                  <select id="productType" onChange={(e)=> (handleTypeChange(e))} required>
                    <option value="0" >Type switcher</option>
                    <option value="Book" >Book</option>
                    <option value="Dvd">DVD</option>
                    <option value="Furniture">Furniture</option>
                  </select>
              </div>
              { selected === '' && <small>You must choose a type</small>}
            </div>

            {
              selected === "Book" && (
                <div>
                  <span>Book</span>
                  <div id="book" className="product-form-section">
                    <div className="products-add-group">
                      <label>Weigth (KG)</label>
                      <input id="weight" type="text" value={inputValues.weight} onChange={(event)=> handleInputChange(event)} required/>                     
                      <small>Please provide weight of the book</small>
                    </div>
                    {errors.weight ? <small className="error-message">{errors.weight}</small> : null}
                  </div>
                </div>
              )
            }
            {
              selected === "Dvd" && (
              <div>
                <span>DVD</span>
                <div id="dvd" className="product-form-section">
                  <div className="products-add-group">
                    <label>Size (MB)</label>
                    <input id="size" type="text" value={inputValues.size} onChange={(event)=> handleInputChange(event)} required/>                   
                    <small>Please provide DVD size</small>
                  </div>
                  {errors.size ? <small className="error-message">{errors.size}</small> : null}
                </div>
              </div>
              )
            }
            {
              selected === "Furniture" && (
              <div>
                <span>Furniture</span>
                <div id="furniture" className="product-form-section">
                  <div className="products-add-group">
                    <label>Heigth (CM)</label>
                    <input id="height" type="text" value={inputValues.height} onChange={(event)=> handleInputChange(event)} required/>                   
                    <small>Please provide the height</small>
                  </div>
                  {errors.height ? <small className="error-message">{errors.height}</small> : null}
                  <div className="products-add-group">
                    <label>Width (CM)</label>
                    <input id="width" type="text" value={inputValues.width} onChange={(event)=> handleInputChange(event)} required/>                    
                    <small>Please provide the width</small>
                  </div>
                  {errors.width ? <small className="error-message">{errors.width}</small> : null}
                  <div className="products-add-group">
                    <label>Length (CM)</label>
                    <input id="length" type="text" value={inputValues.length} onChange={(event)=> handleInputChange(event)} required/>
                    <small>Please provide the lenght</small>
                  </div>
                  {errors.length ? <small className="error-message">{errors.length}</small> : null}                
                </div>
              </div>
              )
            }
        </form>
    </div>
  )
}

export default AddProduct;