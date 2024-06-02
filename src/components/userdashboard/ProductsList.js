import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import './ProductList.css';
import { useNavigate } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const { userobj } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [categoryFilters, setCategoryFilters] = useState({
    love: false,
    comedy: false,
    thriller: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:4000/product-api/getproducts");
      setProducts(result.data.payload);
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e, category) => {
    setCategoryFilters({
      ...categoryFilters,
      [category]: e.target.checked,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    filterProducts();
  }, [categoryFilters, searchTerm, products]);

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.productname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const activeCategories = Object.keys(categoryFilters).filter(
      (category) => categoryFilters[category]
    );

    if (activeCategories.length > 0) {
      filtered = filtered.filter((product) =>
        activeCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  };

  const AddtoCart = (product) => {
    console.log("Product to add to cart:", product);
    axios
      .post("http://localhost:4000/user-api/add-to-cart", {
        productobj: product,
        userobj: userobj,
      })
      .then((response) => {
        alert("Added successfully");
        navigate('/userdashboard/cart')
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  const Gotoproduct = (product) => {
    navigate(`/product/${product.productname}`)
  }

  return (
    <div className="products-container">
      
      <div className="accordion-container">
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header><b>Filter By</b></Accordion.Header>
            <Accordion.Body>
              <h5>Category</h5>
              {Object.keys(categoryFilters).map((category, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={category}
                  checked={categoryFilters[category]}
                  onChange={(e) => handleCategoryChange(e, category)}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        <div className="search-bar">
        
        <Form.Group controlId="searchProduct">
          
          <Form.Control
            type="text"
            placeholder="search movie....."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </div>
        </Accordion>
      </div>
      
      <Container className="w-85">
        <div className="row">
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <div key={product.id} className="product col-md-4 p-4">
                  <img className="image" src={product.imgurl} alt="Product image" style={{ width: '100%' }}/>
                  <div className="middle">
                    <h5 className="productname">{product.productname}</h5>
                    <p className="brand">{product.Description}</p>
                    
                    <div className="button-container">
                      <Button className="button" onClick={() => AddtoCart(product)}>
                        watch Later
                      </Button>
                      
                    </div>
                  </div>
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className="product col-md-4 p-4">
                  <img className="image" src={product.imgurl} alt="Product image" />
                  <div className="middle">
                    <h5 className="productname">{product.productname}</h5>
                    <h4 className="brand">{product.Brand}</h4>
                   
                    <div className="button-container">
                      <Button className="button m-auto" onClick={() => AddtoCart(product)}>
                        Watch Later
                      </Button>
                      
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </Container>
      
    </div>
  );
}

export default ProductsList;
