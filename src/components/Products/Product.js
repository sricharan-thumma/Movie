import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const {productId}=useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let device = (window.location.pathname.split('/')[1])
      let brand = (window.location.pathname.split('/')[2])
      let result = await axios.get(`http://localhost:4000/product-api/getproducts/${device}/${brand}`)
      setProducts(result.data.payload)
    }
    fetchData();
  }, [])

  let navigate = useNavigate();

  const view = (product) => {
    navigate(`/product/${product.pid}`)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addtocart = (product) => {
    delete product["_id"];
    // product.username = Cookies.get('name')
    axios
      .post("http://localhost:5000/cart/add-to-cart", product)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong in adding to cart");
      });
  };

  return (
    <Container className="w-75">
      <h1 className="pb-2">Products</h1>
      <div className="row">
        {
          products.map((product) => (
            <div className="product col-md-4 p-4">
              <img className="image" src={product.imgurl} alt="Card image" style={{ width: '100%' }} />
              <div className="middle">
                <h4 className="fw-bold">{product.productname}</h4>
                <br />
                <h6 className="fw-bold">₹{product.price}</h6>
                <button className="but fw-bold" type="button" onClick={() => addtocart(product)} >
                  Add to cart
                </button>

                <button className="but fw-bold" type="button" onClick={() => view(product)} >
                  View
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </Container >
  );
}

export default Product;