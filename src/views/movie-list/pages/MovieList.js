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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


  export function MovieList({
    data, 
    fetchMovieList,
    fetchGenres,
    gere

  }) {

  const [search, setSearch]       = useState('');
  const [startDate, setStartDate] = useState('');
  
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
        term:event.target[0].value,
        genre:event.target[2].value,
        rating:event.target[3].value,
        year:event.target[4].value,
        orderBy:event.target[5].value,
      });
  }

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

  const sortValues = [
    {
      "id":'popularity.asc',
      'text':'Popularity Ascending'
    },
    {
      "id":'popularity.desc',
      'text':'Popularity Descending'
    },
    {
      "id":'release_date.asc',
      'text':'Release Date Ascending'
    },
    {
      "id":'release_date.desc',
      'text':'Release Date Descending'
    },
    {
      "id":'revenue.asc',
      'text':'Revenue Date Ascending'
    },
    {
      "id":'revenue.desc',
      'text':'Revenue Date Descending'
    },
    {
      "id":'primary_release_date.asc',
      'text':'Primary Release Date Ascending'
    }
  ];


  const rating = [
    {
      'id':"6.5",
      'text':"6.5"
    },
    {
      'id':"7.5",
      'text':"7.5"
    },
    {
      'id':"8.5",
      'text':"8.5"
    },
    {
      'id':"9.5",
      'text':"9.5"
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
            <Form.Label>Genre :</Form.Label>
            <Form.Select>
              <option value="">Select</option>
              {genres && genres.map((genre) => (
                <option value={genre['id']}>{genre['name']}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={3}>
            <Form.Label>Rating :</Form.Label>
            <Form.Select>
              <option value="">Select</option>
              {rating && rating.map((sort) => (
                <option value={sort['id']}>{sort['text']}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={3}>
            <Form.Label>Year :</Form.Label>
            <DatePicker
              showYearPicker
              dateFormat="yyyy"
              selected={startDate}
              placeholderText="Select Year"
              className="form-control"
              onChange={(date) => setStartDate(date)}
            />
          </Col>
          <Col xs={3}>
            <Form.Label>Order By :</Form.Label>
            <Form.Select >
              <option value="">Select</option>
              {sortValues && sortValues.map((sort) => (
                <option value={sort['id']}>{sort['text']}</option>
              ))}
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