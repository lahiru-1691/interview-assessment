import React from "react";
import { Form } from "react-bootstrap";


const FilterDropDown = () => {
    
    return (
        <div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="term">Genre</Form.Label>
                <Form.Select>
                    <option>Select</option>
                </Form.Select>
            </Form.Group>
        </div>
    );
};

export default FilterDropDown;