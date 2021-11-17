import React from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Breadcrumb } from 'react-bootstrap';

const DetailImage = (props) => {
    const {banner} = props;
    
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={banner} />
            </Card>
        </div>
    );
};

export default DetailImage;