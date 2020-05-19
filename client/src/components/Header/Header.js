import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter, useLocation } from 'react-router-dom';

function Header() {
    let location = useLocation();
    let light = location.pathname === "/";
    // let light = true;
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
                    <Nav.Link>Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default withRouter(Header);