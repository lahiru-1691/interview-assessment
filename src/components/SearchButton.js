import Button from "@restart/ui/esm/Button";
import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

const SearchButton = () => {
    return (
        <div>
             <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                />
            <br/>
        </div>
    );
};

export default SearchButton;