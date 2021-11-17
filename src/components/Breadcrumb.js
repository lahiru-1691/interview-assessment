import React from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Breadcrumb } from 'react-bootstrap';

const Breadcrumbs = () => {
    
    return (
        <div>
            <Breadcrumb className="breadcumbs">
            <Breadcrumb.Item href="/">Movies List</Breadcrumb.Item>
            <Breadcrumb.Item active>Movie</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default Breadcrumbs;