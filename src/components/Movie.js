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
    this.loadMovie(this.props.match.params.movieId);
  }

  loadMovie(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=5b19221d20b929615d236692cea743e4&language=en-US`)
    .then(response => response.json())
    .then(res => {
      this.setState({
        movie: res
      });
    });
  }

  render() {
    const { movie } = this.state;
    return (
      movie ?
        <div>
          <Link to='/' className="nav-back">
            ← Movie List
          </Link>
          <h2 className="movie-title-head">{movie.title} ({movie.release_date.slice(0, 4)})</h2>
          <div className="movie-content">
            <div className="movie-image-container">
              <img
                src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                alt="movie-poster"
                className="movie-image-poster"
              />
            </div>
            <div className="movie-info-container">
              <div className="movie-extra-info">
                <span className="movie-length">{movie.runtime} minutes &nbsp;|</span>
                <span className="movie-genre">
                  {movie.genres.map(genre => genre.name).join(' – ')}
                </span>
                <div className="movie-release-date">
                  Release Date – &nbsp;
                  {new Date(movie.release_date).toLocaleString(
                    navigator.language,
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }
                  )}
                </div>
              </div>
              <div className="movie-overview">{movie.overview}</div>
              <a className="movie-website-link" href={`${movie.homepage}`}>Official Website</a>
            </div>
          </div>
        </div>
      : <div>Loading...</div>
    );
  }
}
export default Movie;
