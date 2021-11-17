import React from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
    return (
        <div>
            <Navbar expand="lg" className="nav">
                <Container>
                    <Link className="header-text" to="/">Movie List</Link>
                </Container>
                </Navbar>
                <br/>
        </div>
    );
};

export default Header;