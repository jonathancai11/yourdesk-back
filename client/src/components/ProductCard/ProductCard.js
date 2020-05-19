import React from 'react';
import { Image } from 'react-bootstrap';
import './ProductCard.css'

export default function ProductCard(props) {
    let { product } = props;
    return (
        <div className="ProductCard">
            <Image width="200px" src={product.img} />
        </div>
    )
}