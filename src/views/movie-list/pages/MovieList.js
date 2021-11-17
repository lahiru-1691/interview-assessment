import React, {useEffect, useState, useRef} from "react";
import * as ReactBootStrap from "react-bootstrap";
import Axios from "axios";
import { fetchMovieList } from "../state/actions/movieListActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import Table from 'react-bootstrap/Table';
import { Button, Container } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import SearchInput from "../components/FilterInput";
import { Form, Row, Col} from "react-bootstrap";
import FilterDropDown from "../components/FilterDropdown";
import FilterAction from "../../../components/FilterAction";

  export function MovieList({
    data, 
    fetchMovieList
  }) {

    const [search, setSearch] = useState('')

  useEffect(() => {
    // get source for cancel request axios
    const CancelToken = Axios.CancelToken;
    const source      = CancelToken.source();
    // get promotions data
    fetchMovieList({
      requestCancelToken: source.token
    });

    return () => {
      // when unmount cancel the request
      source.cancel();
    };
  }, []);

  const movies = data.movies;

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
        </form><br/>
        {/* <FilterAction
            config={filterElements}
            triggerAction={filterAction}
          /> */}
        {/* </Form> */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            movies && movies.length > 0 ?
            movies.map(movie => 
              <tr>
                <td><ReactBootStrap.Image src="" roundedCircle /></td>
                <td>{movie.title}</td>
                <td>{movie.vote_count}</td>
                <td>{movie.vote_average}</td>
                <td>{movie.release_date}</td>
                <td><Link to={`/detail/${movie.id}`}><BsEye/></Link></td>
              </tr>
            ):'loading...'
          }
          </tbody>
        </Table>
        {/* {columns && data.movies? (
          <BootstrapTable keyField='id' columns={columns} data={data.movies}/>
        ):'Loading'} */}
      </div>
    </div>
  );
};

MovieList.prototype = {
  fetchMovieList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    data: state.movieList
  };
};

export default connect(mapStateToProps, {
  fetchMovieList
})(MovieList);