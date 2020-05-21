import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { clearAllProducts } from '../../redux/actions';
import { createDesk, uploadImage } from '../../util/api';

export default function ShareForm(props) {

    const products = useSelector(store => store.products);
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const { onSuccessfulUpload } = props; 

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = event => {
        setLoading(true);
        event.preventDefault();
        const form = event.currentTarget;

        let properties = {};
        for (let i = 0; i < form.elements.length; i++) {
          if (form.elements[i].id) {
            properties[form.elements[i].id] = form.elements[i].value;
          }
        }

        console.log(JSON.stringify(products, null, 2));

        onSuccessfulUpload();
        dispatch(clearAllProducts());

        
        // uploadImage(props.image.file).then((resp) => {
        //     let url = resp.data.url;

        //     var desk = {
        //         products: products,
        //         ...properties,
        //         user: user._id,
        //         img: url,
        //         date_created: new Date(),
        //     }

        //     // console.log(JSON.stringify(desk, null, 2));

        //     createDesk(desk).then((data) => {
        //         console.log(data);
        //         setLoading(false);
        //         onSuccessfulUpload();
        //         dispatch(clearAllProducts());
        //     }).catch(function (error) {
        //         console.log(error);
        //     });
        // }).catch(function (error) {
        //     console.log("Error uploading image...");
        //     console.log(error);
        // });
    }

    return (
        <Form className={props.show ? "MainForm" : "hidden"} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Give this desk a name!</Form.Label>
                <Form.Control type="text" defaultValue="Big Bertha"/>
            </Form.Group>
            
            <Form.Group controlId="use">
                <Form.Label>What do you use this desk for?</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue="WFH, Gaming, Programming..."/>
            </Form.Group>
            
            <Form.Group controlId="favorite">
                <Form.Label>Which is your favorite product?</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue="My Macbook!"/>
            </Form.Group>

            <Button loading={isLoading.toString()} variant="primary" type="submit" disabled={isLoading || !props.image}> 
            {isLoading ? 'Uploading...' : 'Submit'}
            </Button>
        </Form>
    )
}