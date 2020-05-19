import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";

import { createDesk, uploadImage } from '../../util/api';

export default function ShareForm(props) {

    const products = useSelector(store => store.products);
    const user = useSelector(store => store.user);

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
        
        uploadImage(props.image.file).then((resp) => {
            let url = resp.data.url;

            var desk = {
                products: products,
                ...properties,
                user: user,
                img: url,
                date_created: new Date(),
            }

            createDesk(desk).then((data) => {
                console.log(data);
                setLoading(false);
                onSuccessfulUpload();
            }).catch(function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log("Error uploading image...");
            console.log(error);
        });
    }

    return (
        <Form className={props.show ? "MainForm" : "hidden"} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Give this desk a name!</Form.Label>
                <Form.Control type="text" placeholder="Big Bertha"/>
            </Form.Group>
            
            <Form.Group controlId="use">
                <Form.Label>What do you use this desk for?</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="WFH, Gaming, Programming..."/>
            </Form.Group>
            
            <Form.Group controlId="favorite">
                <Form.Label>Which is your favorite product?</Form.Label>
                <Form.Control as="textarea" rows="3" placeholder="My Macbook!"/>
            </Form.Group>

            <Button loading={isLoading.toString()} variant="primary" type="submit" disabled={isLoading || !props.image}> 
            {isLoading ? 'Uploading...' : 'Submit'}
            </Button>
        </Form>
    )
}