import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { hideAuthModal } from '../../redux/actions';
import { Modal, Button } from 'react-bootstrap';
import { signIn } from '../../redux/actions';
import { getUser } from '../../util/api';

export default function AuthModal() {

    let { show_auth_modal } = useSelector(store => store.user);
    const dispatch = useDispatch();

    // AUTO-SIGNIN
    // useEffect(() => {
    //     getUser('caimjonathan@gmail.com')
    //     .then((data) => {
    //         let { success, user } = data;
    //         console.log(success, user)
    //         if (!success) {
    //             console.log("Couldnt find user");
    //         } else {
    //             console.log("signing in!")
    //             dispatch(signIn(user));
    //         }
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    //   }, []);

    const handleSignIn = () => {
        getUser('caimjonathan@gmail.com')
        .then((data) => {
            let { success, user } = data;
            if (!success) {
                console.log("Couldnt find user");
            } else {
                dispatch(signIn(user));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleCancelClose = () => {
        dispatch(hideAuthModal());
    }
    
    return (<div>
    <Modal show={show_auth_modal} onHide={handleCancelClose} animation={true} backdrop={true}>
    <Modal.Header closeButton>
      <Modal.Title>Sign in</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Button onClick={handleSignIn}>Sign in as Jonathan</Button>
    </Modal.Body>
  </Modal>

        
    </div>)
}