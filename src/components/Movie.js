import React from 'react';
import '../styles/movie.css';
import { Link } from 'react-router-dom';

class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.loadMovie(this.props.movieId);
  }

  loadMovie(movieId) {
    console.log('loading ', movieId);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=5b19221d20b929615d236692cea743e4&language=en-US`)
    .then(response => response.json())
    .then(res => {
      this.setState({
        movie: res
      })
    })
  }

  render() {
    const { movie } = this.state;
    return (
      movie ?
        <div>
          <Link to='/' className="nav-back">
            Back
          </Link>
          <h2>{movie.title}</h2>
          <img
            src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            alt="movie-poster"
          />
        </div>
      : <div>Loading...</div>
    )
  }
}

export default Movie;
