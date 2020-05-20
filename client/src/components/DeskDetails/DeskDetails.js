import React from 'react';
import './DeskDetails.css';

export default function DeskDetails(props) {
    
    let { desk } = props;
    let date = new Date(desk.date_created).toLocaleDateString("en-US");

    return (
        <div className="DeskDetails">
            <p>{desk.name}</p>
            <p>{desk.user.username}</p>
            <p>Date: {date}</p>
            <p>What do you use this desk for?</p>
            <p>{desk.use}</p>
            <p>Which is your favorite product?</p>
            <p>{desk.favorite}</p>
        </div>
    )
}