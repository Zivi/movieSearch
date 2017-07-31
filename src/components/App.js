import React from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/App.css';
import MovieList from './MovieList';
import Movie from './Movie';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <h1>
          <span className="movie-camera-img" role="img">🎥</span>
          Movie Directory
          </h1>
        </div>
        <Route path='/' exact component={MovieList} />
        <Route path='/movie/:movieId' component={Movie} />
      </div>
    </Router>
  );
}

export default App;
