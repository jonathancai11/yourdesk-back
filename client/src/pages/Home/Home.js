import React, {useEffect, useState} from 'react';
import deskImg from '../../assets/desk2.png';
import DeskCard from '../../components/DeskCard/DeskCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getFeaturedDesks, getFeaturedProducts } from '../../util/api';
import './Home.css'

export default function Home() {
    const [featuredDesks, setFeaturedDesks] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
 
    useEffect(() => {
        getFeaturedDesks()
            .then((data) => {
                let { desks } = data;
                setFeaturedDesks(desks);
            })
            .catch((error) => {
                console.log(error);
            });

        getFeaturedProducts()
            .then((data) => {
                let { products } = data;
                setFeaturedProducts(products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="body">
            <div className="Home">

                {/* <div className="Splash"> */}
                <div className="SplashText">
                    <h1 className="HomeTitle">As we work/game/study at our desk more often,</h1>
                    <h1 className="HomeTitle">it's important that we love our desk.</h1>
                </div>
                <img className="DeskImage" alt="" src={deskImg}/>
                {/* </div> */}

                <h3 className="HomeSubtitle">See what desks other people work/game/study on.</h3>
                <div className="FeaturedList">
                    {featuredDesks.map((desk, i) => <DeskCard key={i} desk={desk}/>)}
                </div>
                <h3 className="HomeSubtitle">Get their take on the products that they love.</h3>
                <div className="FeaturedList">
                    {featuredProducts.map((product, i) => <ProductCard key={i} product={product}/>)}
                </div>
                <h3 className="HomeSubtitle">Share your desk!</h3>

            </div>
        </div>
    );
}