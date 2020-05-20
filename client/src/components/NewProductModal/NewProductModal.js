import React from 'react';
import { Form, Modal, Button, InputGroup, Row, Col, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { deleteProduct, addProductProperties, hideProductModal, deselectAllProducts } from '../../redux/actions';
import './NewProductModal.css';

const productTypes = ["Computer", "Keyboard", "Mouse", "Monitor","Desk", "Chair", "Accessory", "Decoration", "Other"];

export default function NewProductModal() {

  const {currentProduct} = useSelector(store => store.currentProduct);
  const modalShow = useSelector(store => store.currentProduct.show);

  const dispatch = useDispatch();

  const handleCancelClose = () => {
    dispatch(deleteProduct(currentProduct));
    dispatch(hideProductModal());
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

    let updatedProduct = currentProduct;
    updatedProduct.properties = properties;

    dispatch(addProductProperties(updatedProduct));
    dispatch(deselectAllProducts());
    dispatch(hideProductModal());
  }

  return (
    <Modal show={modalShow} onHide={handleCancelClose} animation={true} backdrop={true} dialogClassName='CustomDialogue'>
    <Modal.Header closeButton>
      <Modal.Title>What is this product?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleFormSubmit}>

          <Form.Group controlId="brand" as={Row}>
            <Form.Label column sm="2">Brand</Form.Label>
              <Col sm="10">
            <Form.Control defaultValue="Apple" />
            </Col>
          </Form.Group>

          <Form.Group controlId="model" as={Row}>
            <Form.Label column sm="2">Model</Form.Label>
            <Col sm="10">
              <Form.Control defaultValue="Macbook Pro" />
            </Col>
          </Form.Group>
          
          <Form.Group controlId="category" as={Row}>
            <Form.Label column sm="2">Category</Form.Label>
            <Col sm="10">
              <Form.Control as="select">
                {productTypes.map((type, i) => {
                  return <option key={i}>{type}</option>
                })}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId="url" as={Row}>
            <Form.Label column sm="2">URL</Form.Label>
            <Col sm="10">
              <Form.Control defaultValue="https://www.amazon.com/Apple-MacBook-13-inch-Storage-Keyboard/dp/B0882KD98F/ref=sr_1_1_sspa"/>
            </Col>
          </Form.Group>
          
          <div className="ProductImageContainer">
            <Image src="https://images-na.ssl-images-amazon.com/images/I/71HI3U9ZwZL._AC_SL1500_.jpg" rounded fluid/>
          </div>
          <br/>

          <Form.Group controlId="cost">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" aria-label="Amount (to the nearest dollar)" defaultValue={1199.99} />
            </InputGroup>
          </Form.Group>


          <Form.Group controlId="pros">
            <Form.Label>Pros</Form.Label>
            <Form.Control as="textarea" rows="1" defaultValue="Nice battery life"/>
          </Form.Group>

          <Form.Group controlId="cons">
            <Form.Label>Cons</Form.Label>
            <Form.Control as="textarea" rows="1" defaultValue="Have to buy adapters for everything"/>
          </Form.Group>

          <Button variant="secondary" onClick={handleCancelClose}>
            Cancel
          </Button> &nbsp;
          <Button variant="primary" type="submit">
            Save
          </Button>
        
        </Form>
        </Modal.Body>
  </Modal>
  );
}