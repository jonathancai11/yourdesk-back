import React, { useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import NewProductModal from '../../components/NewProductModal/NewProductModal';
import Canvas from '../../components/Canvas/Canvas';
import ShareForm from '../../components/ShareForm/ShareForm';
import Dropzone from 'react-dropzone';
import './Share.css';
import Fade from '../../components/Util/Fade';
import { Alert } from 'react-bootstrap';

// import { useSelector } from 'react-redux';

export default function Share() {

    // const products = useSelector(store => store.products);
    // let numProducts = 0;
    // for (let i = 0; i < products.allIds.length; i++) {
    //     if (products.byIds[products.allIds[i]].saved) {
    //         numProducts++;
    //     }
    // }

    const [image, setImage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const handleDrop = (e) => {
        if (e.length === 0) {
            setShowAlert(true);
        } else {
            let file = e[0];
            let blob = URL.createObjectURL(file);
            setImage({
                blob: blob,
                file: file,
            });
        }
    }

    let show = (image !== null);

    const DrozoneComponent = (<Dropzone 
        onDrop={handleDrop}
        multiple={false}
        accept="image/*"
        >
        {({getRootProps, getInputProps}) => (
            <div {...getRootProps()} className="Dropzone">
                <input {...getInputProps()} />
                <p className="DropzonePrompt">Drop an image of your desk here.</p>
            </div>
        )}
        </Dropzone>);

    const onSuccessfulUpload = () => {
        setImage(null);
    }

    return (
        <div className="body">
            {<Fade in={showAlert} component={<Alert onClick={() => setShowAlert(false)} variant={'danger'} dismissible>Sorry, only image files please!</Alert>} />}
            <NewProductModal/>
            <div className="NewBody">

                {/* TODO: This fade is not working */}
                { (!show) && <Fade in={!show} component={DrozoneComponent} />} 
                {<Fade in={show} component={<Canvas show={show} share image={image ? image.blob : null}/>} />}
                {<Fade in={show} component={<ProductList show={show} share/>} />}
                {<Fade in={show} component={<ShareForm onSuccessfulUpload={onSuccessfulUpload} show={show} image={image} share/>} />}
            </div>      
        </div>
    );
}