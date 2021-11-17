import React from "react";


const DetailText = (props) => {
    const {text} = props;
    
    return (
        <div>
            <p className="text-left"><b>Synopsis</b></p>
            <p className="text-left"><i>
            {text}
            </i></p> 
        </div>
    );
};

export default DetailText;