import React, {useState, useEffect} from 'react';
import { Stage, Layer, Circle, Image } from "react-konva";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProduct, showModal, deselectAllProducts, selectProduct } from '../../redux/actions';

export default function Canvas(props) {

    const dispatch = useDispatch();
    const products = useSelector(store => store.products);
    const [image, setImage] = useState(new window.Image());
    
    useEffect(() => {
        const img = new window.Image();
        img.src = props.image;
        img.onload = () => {
            var scale = Math.min((600/img.width),(600/img.height));
            img.width = img.width*scale;
            img.height = img.height*scale;
            setImage(img);
        }
      }, [props.image]);

    const layerHandleClick = (e) => {
        if (props.share && !e.target.attrs.radius) {
            // If not circle, create a new product
            let newProduct = {
                coords: {
                    x: e.evt.layerX,
                    y: e.evt.layerY,
                },
            };
            dispatch(addProduct(newProduct));
            dispatch(showModal());
        }
    }

    const handleHover = (e) => {
        if (e.target.attrs.product) {
            dispatch(selectProduct(e.target.attrs.product));
        } else {
            dispatch(deselectAllProducts());
        }
    }
    
    return (
    <div className={props.show ? "Canvas" : "hidden"} style={{zIndex: 1050}}>
        <Stage width={600} height={600} onMouseOver={handleHover}>
            <Layer onClick={layerHandleClick} >
            <Image x={0} y={0} image={image} />
            
            {products.allIds.map((id, i) =>  
                {
                    let { product, selected } = products.byIds[id];
                    return (<Circle 
                    key={i}
                    x={product.coords.x} 
                    y={product.coords.y} 
                    width={ selected ? 30 : 20} 
                    height={ selected ? 30 : 20} 
                    fill={ "white" }
                    shadowBlur={2}
                    opacity={ 1 }
                    product={product}
                    />)
                }
            )}
            </Layer>
        </Stage>
      </div>
  )
}