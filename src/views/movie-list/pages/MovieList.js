import React, {useEffect, useState, useRef} from "react";
import * as ReactBootStrap from "react-bootstrap";
import Axios from "axios";
import { fetchMovieList, fetchGenres } from "../state/actions/movieListActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import Table from 'react-bootstrap/Table';
import { Button, Container } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import SearchInput from "../components/FilterInput";
import { Form, Row, Col, Image, Badge} from "react-bootstrap";
import FilterDropDown from "../components/FilterDropdown";

  export function MovieList({
    data, 
    fetchMovieList,
    fetchGenres,
    gere

  }) {

  const [search, setSearch] = useState('');

  useEffect(() => {
    // get source for cancel request axios
    const CancelToken = Axios.CancelToken;
    const source      = CancelToken.source();
    fetchGenres({
      requestCancelToken: source.token
    })
  }, []);

  useEffect(() => {
    // get source for cancel request axios
    const CancelToken = Axios.CancelToken;
    const source      = CancelToken.source();
    // get promotions data
    fetchMovieList({
      requestCancelToken: source.token
    });

    fetchGenres({
      requestCancelToken: source.token
    })

    return () => {
      // when unmount cancel the request
      source.cancel();
    };
  }, []);

  

  const movies = data.movies;
  const genres = gere?.genres?.genres;
  

  const banner = 'https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg';

  const filterElements = [
    {
      type: "input",
      action: "name",
      name: "search",
      placeholder: "Name...",
      prefix: "",
      columnSize: {
        lg: 6,
        sm: 24,
        md: 6,
        xs: 24,
      },
    },
    {
      type: "button",
      name: "search",
      text: "Search",
      class: "btn-action-secondary",
      icon: '',
      columnSize: {
        lg: 4,
        sm: 24,
        md: 4,
        xs: 24,
      },
    },
  ];


  const filterData = (event) => {
    event.preventDefault();
    console.log();

  }

  const handleSubmit = (event) => {
    event.preventDefault();

      const CancelToken = Axios.CancelToken;
      const source      = CancelToken.source();

      fetchMovieList({
        requestCancelToken: source.token,
        data:event.target[0].value
      });
  }

  // const genresArray = [
  //   {
  //       "id": 28,
  //       "name": "Action"
  //   },
  //   {
  //       "id": 12,
  //       "name": "Adventure"
  //   },
  //   {
  //       "id": 16,
  //       "name": "Animation"
  //   },
  //   {
  //       "id": 35,
  //       "name": "Comedy"
  //   },
  //   {
  //       "id": 80,
  //       "name": "Crime"
  //   },
  //   {
  //       "id": 99,
  //       "name": "Documentary"
  //   },
  //   {
  //       "id": 18,
  //       "name": "Drama"
  //   },
  //   {
  //       "id": 10751,
  //       "name": "Family"
  //   },
  //   {
  //       "id": 14,
  //       "name": "Fantasy"
  //   },
  //   {
  //       "id": 36,
  //       "name": "History"
  //   },
  //   {
  //       "id": 27,
  //       "name": "Horror"
  //   },
  //   {
  //       "id": 10402,
  //       "name": "Music"
  //   },
  //   {
  //       "id": 9648,
  //       "name": "Mystery"
  //   },
  //   {
  //       "id": 10749,
  //       "name": "Romance"
  //   },
  //   {
  //       "id": 878,
  //       "name": "Science Fiction"
  //   },
  //   {
  //       "id": 10770,
  //       "name": "TV Movie"
  //   },
  //   {
  //       "id": 53,
  //       "name": "Thriller"
  //   },
  //   {
  //       "id": 10752,
  //       "name": "War"
  //   },
  //   {
  //       "id": 37,
  //       "name": "Western"
  //   }
  // ];

  const imageFormatter = (cell, obj) => {
    return (
      <Image className="banner" src={`https://image.tmdb.org/t/p/original${obj.poster_path}`} rounded />
    );
  }

  const linkFormatter = (cell, obj) => {
    return (
      <Link to={`/detail/${obj.id}`}><BsEye/></Link>
    );
  }

  const yearFormatter = (cell, obj) => {
    const year = parseInt(obj.release_date);
    return (
      <span>{year}</span>
    );
  }

  const genreFormatter = (cell, obj) => {
    return (<div>
      {genres && genres.map((genre) => (
        check(genre, obj)?(
          <span className="tag"><Badge bg="info">{genre['name']}</Badge></span>
        ):''
      ))}
      </div>);
  }

  const check = (genre, obj) => {
    if(obj.genre_ids.includes(genre['id'])){
      return true;
    }
    return false;
  }

  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      hidden: true
    },
    {
      dataFIled:"poster_path",
      text:"Image",
      formatter: imageFormatter
    },
    {
      dataField: "title",
      text: "Title",
      sort: true
    },
    {
      dataField: "genre_ids",
      text: "Genre",
      sort: true,
      formatter:genreFormatter
    },
    {
      dataField: "vote_average",
      text: "Rating",
      sort: true
    },
    {
      dataField: "release_date",
      text: "Year",
      formatter:yearFormatter
    },
    {
      dataField: "",
      text: "Action",
      formatter:linkFormatter
    },
  ];

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
        <Row>
          <Col xs={11}>
            <input type="text" className="form-control" placeholder="search" onChange={(e) => setSearch(e.target.value)} />
          </Col>
          <Col xs={1}>
            <button type="submit" className="btn btn btn-primary" >Search</button>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col xs={3}>
            <Form.Select>
              <option>Select Genre</option>
              {genres && genres.map((genre) => (
                <option value={genre['id']}>{genre['name']}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={3}>
            <Form.Select>
              <option>Select Rating</option>
            </Form.Select>
          </Col>
          <Col xs={3}>
            <input type="text" id="datepicker" className="form-control" placeholder="Year"/>
          </Col>
          <Col xs={3}>
            <Form.Select>
              <option>Order By</option>
            </Form.Select>
          </Col>
        </Row>
        </form><br/>
        
        {columns && data.movies? (
        <BootstrapTable
          keyField="id"
          data={movies}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
        ):'Loading'}
      </div>
    </div>
  );
};

MovieList.prototype = {
  fetchMovieList: PropTypes.func.isRequired,
  fetchGenres:PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    data: state.movieList,
    gere: state.genre
  };
};

export default connect(mapStateToProps, {
  fetchMovieList,
  fetchGenres
})(MovieList);