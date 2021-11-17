import React from "react";
import { Link, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";


const SearchInput = () => {
    
    return (
        <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Search..." />
            </Form.Group>
        </div>
    );
};

export default SearchInput;