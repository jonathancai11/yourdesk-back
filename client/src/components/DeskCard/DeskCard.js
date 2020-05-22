import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function DeskCard(props) {
    const { desk } = props;
    let date = new Date(desk.date_created).toLocaleDateString("en-US");
    // let { user } = desk;
    console.log(desk);

    return (
        <div>
            <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={desk.img} thumbnail="true" height="200px" />
            <Card.Body>
                <Card.Title>{desk.name}</Card.Title>
                <Card.Text>
                {/* {user.firstname} {user.lastname} */}
                </Card.Text>
                <Card.Text>
                {date}
                </Card.Text>
                {/* <Button href={"/desk/@" + user.username + "/"+ desk.id} variant="outline-primary">Check it out!</Button> */}
            </Card.Body>
            </Card>
        </div>
    );
}