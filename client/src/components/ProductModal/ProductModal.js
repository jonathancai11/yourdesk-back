import React, {useEffect, useState} from 'react';
import { Form, Modal, Button, InputGroup, Row, Col, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { deleteProduct, addProductProperties, hideProductModal, deselectAllProducts } from '../../redux/actions';
import { getProducts } from '../../util/api';
import './ProductModal.css';

const productTypes = ["", "Computer", "Keyboard", "Mouse", "Monitor","Desk", "Chair", "Accessory", "Decoration", "Other"];

const emptyProduct = {
  brand: "",
  model: "",
  category: "",
  url: "",
  img: "",
  price: "",
}

export default function NewProductModal() {

  const {currentProduct} = useSelector(store => store.currentProduct);
  const showModal = useSelector(store => store.currentProduct.show);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
  const dispatch = useDispatch();

  useEffect(() => {

    if (showModal) {
      getProducts()
        .then(data => {
          setProducts(data.products);
        })
    }

  }, [showModal])


  const handleCancelClose = () => {
    if (!currentProduct.saved) {
      dispatch(deleteProduct(currentProduct));
    }
    dispatch(hideProductModal());
    setSelectedProduct(emptyProduct);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    let properties = {};
    for (let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].id) {
        properties[form.elements[i].id] = form.elements[i].value;
      }
    }
    currentProduct.pros = properties.pros;
    currentProduct.cons = properties.cons;
    delete properties.pros;
    delete properties.cons;

    currentProduct.properties = selectedProduct;
    currentProduct.productId = selectedProduct._id;
    currentProduct.saved = true;

    dispatch(addProductProperties(currentProduct));
    dispatch(deselectAllProducts());
    dispatch(hideProductModal());
    setSelectedProduct(emptyProduct);
  }

  const handleSelectProduct = (e) => {
    let idx = e.currentTarget.value;
    if (idx === '-1') {
      setSelectedProduct(emptyProduct);
    } else {
      setSelectedProduct(products[idx]);
    }
  }
  
  let disabled = selectedProduct.brand;
  // let disabled = true;

  return (
    <Modal show={showModal} onHide={handleCancelClose} animation={true} backdrop={true} dialogClassName='CustomDialogue'>
    <Modal.Header closeButton>
      <Modal.Title>What is this product?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleFormSubmit}>

        <Form.Group controlId="product" as={Row}>
            <Form.Label column sm="2">Product</Form.Label>
            <Col sm="10">
              <Form.Control as="select" onChange={handleSelectProduct}>
              <option value={-1}>Select a product or create a new one:</option>
                {products.map((product, i) => {
                  return <option key={i} value={i}>{product.brand + ' ' + product.model}</option>
                })}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId="brand" as={Row}>
            <Form.Label column sm="2">Brand</Form.Label>
              <Col sm="10">
            <Form.Control disabled={disabled} value={selectedProduct.brand}/>
            </Col>
          </Form.Group>

          <Form.Group controlId="model" as={Row}>
            <Form.Label column sm="2">Model</Form.Label>
            <Col sm="10">
              <Form.Control disabled={disabled} value={selectedProduct.model}/>
            </Col>
          </Form.Group>
          
          <Form.Group controlId="category" as={Row}>
            <Form.Label column sm="2">Category</Form.Label>
            <Col sm="10">
              <Form.Control disabled={disabled} as="select" value={selectedProduct.category}>
                {productTypes.map((type, i) => {
                  return <option key={i}>{type}</option>
                })}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId="url" as={Row} readOnly>
            <Form.Label column sm="2">URL</Form.Label>
            <Col sm="10">
              <Form.Control disabled={true} value={selectedProduct.url}/>
            </Col>
          </Form.Group>
          
          <div className="ProductImageContainer">
            <Image src={selectedProduct.img} rounded fluid className="ProductImage"/>
          </div>
          <br/>

          <Form.Group controlId="price" as={Row} readOnly>
          <Form.Label column sm="2">Price</Form.Label>
          <Col sm="10">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control disabled={true} value={selectedProduct.price} type="text" aria-label="Amount (to the nearest dollar)" />
            </InputGroup>
          </Col>
          </Form.Group>


          <Form.Group controlId="pros">
            <Form.Label>Pros</Form.Label>
            <Form.Control as="textarea" rows="1" placeholder="Nice battery life"/>
          </Form.Group>

          <Form.Group controlId="cons">
            <Form.Label>Cons</Form.Label>
            <Form.Control as="textarea" rows="1" placeholder="Have to buy adapters for everything"/>
          </Form.Group>

          <Button variant="secondary" onClick={handleCancelClose}>
            Cancel
          </Button> &nbsp;
          <Button disabled={ !currentProduct.saved && !selectedProduct.brand } variant="primary" type="submit">
            Save
          </Button>
        
        </Form>
        </Modal.Body>
  </Modal>
  );
}