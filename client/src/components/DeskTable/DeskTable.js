import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';

export default function DeskTable(props) {
    let { desks } = props;
    return (
        <Table responsive>
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>User</th>
            <th>Date Created</th>
            <th>Image</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
            {
                desks.map((desk, i) => {
                    let date = new Date(desk.date_created).toLocaleDateString("en-US");
                    return (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{desk.name}</td>
                        <td>{desk.user.username}</td>
                        <td>{date}</td>
                        <td><Image width="80px" src={desk.img}/></td>
                        <td><Button 
                            href={"/desk/@" + desk.user.username + "/"+ desk.id} 
                            variant="primary">Check it out</Button>{' '}
                        </td>
                    </tr>
                )
            })
            }
        </tbody>
        </Table>        
    );
}