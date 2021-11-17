import React from "react";
import { BsTagFill } from "react-icons/bs";
import { Breadcrumb } from 'react-bootstrap';

const TagList = (props) => {
    const {tags} = props;

   
    
    return (
        <div>
            <Breadcrumb bgcolor="white" className="breadcumbs" style={{backgroundColor:"white"}}>
                <Breadcrumb.Item active key={1} style={{backgroundColor:"white"}}><BsTagFill /></Breadcrumb.Item>
                {tags.map(gen =>   
                    <Breadcrumb.Item key={gen.id} active style={{backgroundColor:"white"}}>{gen.name}</Breadcrumb.Item>
                )}
            </Breadcrumb>
        </div>
    );
};

export default TagList;