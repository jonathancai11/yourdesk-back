import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { showAuthModal, signOut } from '../../redux/actions';
import './Header.css';
import { useAuth0 } from "../../react-auth0-spa";

function Header() {

    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

    console.log(user);
    let light = true;

    const handleSignIn = () => {
        // dispatch(showAuthModal());
        loginWithRedirect();
    }

    const handleSignOut = () => {
        logout();
        // dispatch(signOut());
    }

    const SignedIn = (isAuthenticated && 
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Navbar.Text>Hi, {user.given_name}! </Navbar.Text> &nbsp;
            <div className="vl"/>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <div className="vl"/>
            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
        </div>);
    const SignedOut = (!isAuthenticated && <Nav.Link onClick={handleSignIn}>Sign In</Nav.Link>);
    
    return (
        <Navbar collapseOnSelect expand="lg" bg={light ? "white" : "dark"} variant={light ? "light" : "dark"} className="Header">
            <Navbar.Brand href="/" style={{fontSize: "170%"}}>My Desk Tour</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/explore" className="HeaderNav">Explore</Nav.Link>
                    <Nav.Link href="/charts" className="HeaderNav">Charts</Nav.Link>
                    <Nav.Link href="/share" className="HeaderNav">Share</Nav.Link>
                    <Nav.Link href="/about" className="HeaderNav">About</Nav.Link>
                </Nav>
                <Nav>
                    { isAuthenticated ? SignedIn : SignedOut }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Header);