
import './App.css';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import MovieList from "./views/movie-list/pages/MovieList";
import MovieDetail from "./views/movie-detail/pages/MovieDetail";
import Header from "./components/Header";
import About from './About';


function App() {
  return (
    <Router>
      <div className="App">
            <Header/>
            <Switch>
              <Route exact path='/' component={MovieList}/>
              <Route path='/detail/:id' component={MovieDetail}/>
            </Switch>
      </div>
    </Router>
  );
}

export default App;
