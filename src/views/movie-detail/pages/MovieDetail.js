import React, {useEffect, useState} from 'react';
import Axios from "axios";
import { fetchMovieDetails } from '../state/actions/movieDetailAction';
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as ReactBootStrap from "react-bootstrap";
import { Container, Row, Col, Breadcrumb,Card, Button } from 'react-bootstrap';
import { BsTagFill,BsFillStarFill } from "react-icons/bs";
import Breadcrumbs from '../../../components/Breadcrumb';
import DetailImage from '../component/DetailImage';
import TagList from '../component/TagList';
import DetailText from '../component/DetailText';
import Reviews from '../component/Reviews';


export const MovieDetail = ({
    fetchMovieDetails,
    data
}) => {

    // params
    const { id } = useParams();
   // const [movie, setName] = useState('');
    const banner = 'https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg';
    var year = parseInt(data?.movieDetail?.release_date);
    //setName(data?.movieDetail?.title);
    
    useEffect(() => {
        // get source for cancel request axios
        const CancelToken = Axios.CancelToken;
        const source      = CancelToken.source();
        // get promotions data
        fetchMovieDetails({
          requestCancelToken: source.token,
          movieId:id
        });
    
        return () => {
          // when unmount cancel the request
          source.cancel();
        };
      }, []);

    //  setMovie(data);

      return (
          <div>
              <Container>
                <Row>
                    <Col md={4}>
                        <Breadcrumbs/>
                        <DetailImage banner={banner}/>
                    </Col>
                    <Col md={8}>
                        <h3 className="text-left">{data?.movieDetail?.title}</h3> 
                        <h5 className="text-left">{year}</h5>
                        {data?.movieDetail?.genres ?
                            <TagList tags={data?.movieDetail?.genres}/>
                        :''}
                        <Reviews reviews={data?.movieDetail?.vote_average}/> 
                        <DetailText text={ data?.movieDetail?.overview }/>        
                    </Col>
                </Row>
            </Container>
          </div>
      );
}

MovieDetail.prototype = {
    fetchMovieList: PropTypes.func.isRequired
};
  
  const mapStateToProps = (state) => {
    return {
      data: state.movieDetail
    };
  };
  
  export default connect(mapStateToProps, {
    fetchMovieDetails
  })(MovieDetail);

