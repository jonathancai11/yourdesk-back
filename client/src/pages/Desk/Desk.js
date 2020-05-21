import React, { useEffect, useState } from 'react';
import Canvas from '../../components/Canvas/Canvas';
import ProductList from '../../components/ProductList/ProductList';
import DeskDetails from '../../components/DeskDetails/DeskDetails';
import { getDesk } from '../../util/api.js';
import { useDispatch } from 'react-redux';
import { setAllDeskProducts } from '../../redux/actions';

export default function Desk(props) {

    const dispatch = useDispatch();
    const [desk, setDesk] = useState(null);

    let path = props.location.pathname.split("/");
    let username = path[2];
    let deskId = path[3];

    useEffect(() => {
        getDesk(username, deskId)
        .then((data) => {
            let { success, desk } = data;
            if (!success) {
                console.log("Failed to retrieve desk? Either username didn't exist, or desk id didn't exist");
            } else {
                setDesk(desk);
                dispatch(setAllDeskProducts(desk.products));
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [deskId, username, dispatch]);

    return (
        <div className="body">
            {
                desk &&
            <div className="NewBody">
                <DeskDetails desk={desk}/>
                <Canvas show={true} image={desk.img}/>
                <ProductList show={true} />
            </div>
            }
        </div>
    )
}