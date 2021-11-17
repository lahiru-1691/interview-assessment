import React from "react";
import ReactStars from "react-rating-stars-component";

const Reviews = (props) => {

    const {reviews} = props;
    let calRating = 0;
    if(reviews != undefined){
        calRating = reviews;
    }
   
    calRating = parseInt(calRating/2);

    return (
        <div>
            <div className="text-left">
                <span className="rating">{reviews}</span>
                <span className="rate-from">/ 10</span>
                <ReactStars count={5} value={4} size={30} edit={false} activeColor="#ffd700"/>
            </div>
        </div>
    );
};

export default Reviews;