import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


function ProductsList() {

    const [products, setProducts] = useState([]);
    const {userobj}=useSelector(state=>state.user);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:4000/product-api/getproducts")
      setProducts(result.data.payload)
    }
    fetchData();
  }, [])

  let navigate = useNavigate();

  const AddtoCart = (product) => {
    // Make a POST request to send the request to the tutor
    console.log("Product to add to cart:", product);
    axios.post("http://localhost:4000/user-api/add-to-cart", {
      productobj:product,
      userobj:userobj,
    })
    .then(response => {
      // Handle success, e.g., show a confirmation message
      alert("AAdded  successfully");
    })
    .catch(error => {
      // Handle error
      console.error('Error occurred:', error);
    });
  };

  return (
    <div>
        <Container className="w-75">
      <h1 className="pb-2">Products</h1>
      <div className="row">
        {
          products.map((product) => (
            <div className="product col-md-4 p-4">
              <img className="image" src={product.imgurl} alt="Card image" style={{ width: '100%' }} />
              <div className="middle">
                <h5 className="fw-bold">{product.productname}</h5>
                <h4 className="fw-bold">{product.Brand}</h4>
                <br />
                <h6 className="fw-bold">₹{product.price}</h6>
                <Button          
                variant="primary"
                onClick={() => AddtoCart(product)}>Add to Cart
                </Button>
               
                
               
      
                
              </div>
            </div>
          ))
        }
      </div>
    </Container >
    </div>
  )
}

export default ProductsList;