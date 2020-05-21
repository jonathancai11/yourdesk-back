import React, { useEffect, useState } from 'react';
import DeskCard from '../../components/DeskCard/DeskCard';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { getDesks, deleteDesks, createDesk, createUser, createProduct } from '../../util/api';
import { useSelector } from "react-redux";
import sampleDesk from '../../data/sampleDesk.json';
import sampleProduct from '../../data/sampleProduct.json';
import "./Explore.css";

export default function Explore() {

    const [desks, setDesks] = useState([]);
    const { user } = useSelector(store => store.user);
 
    useEffect(() => {
        getDesks()
            .then((data) => {
                setDesks(data.desks);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const deleteAllDesks = () => {
        deleteDesks()
            .then((resp) => {
                console.log("Backend says deleted all desks successfully");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const uploadSampleDesk = () => {
        let desk = sampleDesk;
        desk.user = user._id;

        createDesk(sampleDesk)
            .then((resp) => {
                console.log(resp);
            }).catch(function (error) {
                console.log(error);
            });
    }

    const createSampleUser = () => {
        createUser(user).then(data => {
            console.log("Success creating user!");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const createSampleProduct = () => {
        createProduct(sampleProduct[1]).then(data => {
            console.log("Success creating product!");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="body">
            <Form>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId="search">
                        <Form.Control type="email" placeholder="Search for desks, users, products, brands"/>
                        <Form.Text className="text-muted">This is some informative text.</Form.Text>
                    </Form.Group>
                </Col>

                <Col>
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                    &nbsp;
                    <Button onClick={deleteAllDesks} variant="outline-danger" type="submit">
                        Delete all
                    </Button>
                    &nbsp;
                    <Button onClick={uploadSampleDesk} variant="outline-success" type="submit">
                        Create Test Desk
                    </Button>
                    &nbsp;
                    {/* <Button onClick={createSampleProduct} variant="outline-success" type="submit">
                        Create Test Product
                    </Button>
                    &nbsp; */}
                    {/* <Button onClick={createSampleUser} variant="outline-success" type="submit">
                        Create Test User
                    </Button> */}

                </Col>
            </Row>
            </Form>
            <div className="DeskGrid">
                {desks.map((desk, i) => <DeskCard key={i} desk={desk}/>)}
            </div>
        </div>
    );
}