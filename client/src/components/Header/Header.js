import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { showAuthModal, signOut } from '../../redux/actions';

function Header() {
    let location = useLocation();
    // let light = location.pathname === "/";
    let light = true;
    let { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleSignIn = () => {
        dispatch(showAuthModal());
    }

    const handleSignOut = () => {
        dispatch(signOut());
    }

    const SignedIn = (user && <div style={{display: 'flex', flexDirection: 'row'}}>
        <Navbar.Text>Hi, {user.firstname}! </Navbar.Text>
        <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
        </div>);
    const SignedOut = (<Nav.Link onClick={handleSignIn}>Sign In</Nav.Link>);
    
    return (
        <Navbar collapseOnSelect expand="lg" bg={light ? "white" : "dark"} variant={light ? "light" : "dark"}>
            <Navbar.Brand href="/">[Insert Title Here]</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/explore">Explore</Nav.Link>
                    <Nav.Link href="/charts">Charts</Nav.Link>
                    <Nav.Link href="/share">Share</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                </Nav>
                <Nav>
                    { user ? SignedIn : SignedOut }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Header);