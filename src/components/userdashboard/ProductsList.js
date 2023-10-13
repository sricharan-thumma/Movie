import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import './ProductList.css';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const { userobj } = useSelector((state) => state.user);

  const [categoryFilters, setCategoryFilters] = useState({
    Men: false,
    Women: false,
    Kids: false,
  });

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

  useEffect(() => {
    filterProducts();
  }, [categoryFilters, products]);

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      if (categoryFilters.Men && product.category === 'Men') {
        return true;
      }
      if (categoryFilters.Women && product.category === 'Women') {
        return true;
      }
      if (categoryFilters.Kids && product.category === 'Kids') {
        return true;
      }
      return false;
    });
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
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

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
        </Accordion>
      </div>
      <div className="products-list">
        <Container className="w-85">
          <div className="row">
            {filteredProducts.length > 0
              ? filteredProducts.map((product) => (
                  <div key={product.id} className="product col-md-4 p-4">
                    <img className="image" src={product.imgurl} alt="Product image" />
                    <div className="middle">
                      <h5 className="productname">{product.productname}</h5>
                      <h4 className="brand">{product.Brand}</h4>
                      <h6 className="price">₹{product.price}</h6>
                      <div className="button-container">
                        <Button className="button" onClick={() => AddtoCart(product)}>
                          Add to Cart
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
                      <h6 className="price">₹{product.price}</h6>
                      <div className="button-container">
                        <Button className="button" onClick={() => AddtoCart(product)}>
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ProductsList;
