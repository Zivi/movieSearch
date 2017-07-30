import React, { Component } from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/App.css';
import List from './List';
import Movie from './Movie';

class App extends Component {
  renderMovie({ match }) {
    const movieId = match.params.movieId;
    return (
      <Movie movieId={movieId} />
    );
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h1>Movie Directory</h1>
          </div>
          <Route path='/' exact component={List} />
          <Route path='/movie/:movieId' render={this.renderMovie.bind(this)} />
        </div>
      </Router>
    );
  }
}

export default App;
