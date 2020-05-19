import React, {useState, useEffect} from 'react';
import DeskTable from '../../components/DeskTable/DeskTable';
import ProductTable from '../../components/ProductTable/ProductTable';
import { getTopDesks, getTopProducts } from '../../util/api';

export default function Charts() {
    const [topDesks, setTopDesks] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        getTopDesks()
            .then((data) => {
                let desks = data.desks;
                setTopDesks(desks);
            })
            .catch((error) => {
                console.log(error);
            });

        getTopProducts()
            .then((data) => {
                let products = data.products;
                setTopProducts(products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="body">
            <p>Top Desks</p>
            <DeskTable desks={topDesks}/>
            <p>Top Products</p>
            <ProductTable products={topProducts}/>
        </div>
    );
}