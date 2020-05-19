import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { selectProduct, deselectProduct, deleteProduct } from '../../redux/actions';

export default function ProductCard(props) {

    const dispatch = useDispatch();
    const products = useSelector(store => store.products);

    let total = 0;
    for (let i = 0; i < products.allIds.length; i++) {
        let product = products.byIds[products.allIds[i]].product;
        if (product.properties) {
            if (product.properties.cost) {
                total += parseFloat(product.properties.cost);
            }
        }
    }

    const handleMouse = (selected, product) => {
        if (selected) {
            dispatch(deselectProduct(product));
        } else {
            dispatch(selectProduct(product));
        }
    }

    const handleDelete = product => {
        dispatch(deleteProduct(product));
    }

    return (
    <div className={props.show ? "ProductList" : "hidden"}>
        <Accordion>
            {products.allIds.map((id, i) =>  
                {
                let { product, saved, selected  } = products.byIds[id];
                return (
                saved &&
                <Card key={i}>
                    <Accordion.Toggle as={Card.Header} onMouseOver={() => handleMouse(selected, product)} onMouseOut={() => handleMouse(selected, product)} 
                        eventKey={i} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                   
                   {product.properties.brand + " " + product.properties.model} {"$" + (product.properties.cost ? product.properties.cost : "0")}

                    {props.share && <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product)}>Delete</Button>}
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={i} in={selected}>
                    <Card.Body>
                    
                    <p>Category: {product.properties.category}</p>
                    <p>Pros:</p>
                    <p>{product.properties.pros}</p>
                    <p>Cons:</p>
                    <p>{product.properties.cons}</p>

                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                );
            }
            )}        
        <hr/>
            {"Total cost: $" + total.toString()}
        </Accordion>
  </div>
  )
}