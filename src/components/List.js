import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/list.css';
import Search from './Search';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      resultCount: {},
      currentSearch: ''
    }
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=5b19221d20b929615d236692cea743e4&language=en-US&page=1')
    .then(response => response.json())
    .then(res => {
      this.setState({
        movies: res.results,
        resultCount: {
          page: res.page,
          pageCount: res.total_pages
        }
      })
    })
  }

  handlSearchChange(event) {
    const searchTerm = event.target.value;
    this.setState({
      currentSearch: searchTerm
    })

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=5b19221d20b929615d236692cea743e4&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(res => {
      this.setState({
        movies: res.results,
        resultCount: {
          page: res.page,
          pageCount: res.total_results
        }
      })
    })
  }

  render() {
    const { movies } = this.state;
    const { resultCount } = this.state;
    return (
      <div>
        <Search value={this.state.currentSearch} onChange={this.handlSearchChange.bind(this)}/>
        <h2 className="popular-heading">Popular Movies</h2>
        <ul className="movie-list">
          {movies.map(movie =>
            <li key={movie.id} >
              <Link
                to={`/movie/${movie.id}`}
              >
                {movie.title}
              </Link>
            </li>
          )}
        </ul>
        <div className="page">
          <button>Previous</button>
          Page {resultCount.page} of {resultCount.pageCount}
          <button>Next</button>
        </div>
      </div>
    )
  }
}

export default List;
