import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/list.css';
import Search from './Search';

class List extends React.Component {
  constructor({match, location}) {
    super();

    const urlParse = location.search.match(/q=([^&]*)&page=(\d*)/);
    this.state = {
      movies: [],
      resultCount: {},
      currentSearch: urlParse ? urlParse[1] : '',
      pageNum: urlParse ? +urlParse[2] : 1
    }
  }

  componentDidMount() {
    this.loadMovies();
  }

  handlSearchChange(event) {
    const searchTerm = event.target.value;

    this.setState({
      currentSearch: searchTerm
    }, () => this.loadMovies());
  }

  loadMovies() {
    const pageNum = this.state.pageNum;
    const searchTerm = this.state.currentSearch;
    this.props.history.replace(`/?q=${searchTerm}&page=${pageNum}`);
    if (searchTerm) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=5b19221d20b929615d236692cea743e4&language=en-US&query=${searchTerm}&page=${pageNum}&include_adult=false`)
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
    } else {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5b19221d20b929615d236692cea743e4&language=en-US&page=${pageNum}`)
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
    this.listHeading();
  }

  listHeading() {
    if (this.state.currentSearch) {
      this.setState({
        listHeading: `Showing search results for ${this.state.currentSearch}`
      })
    } else {
      this.setState({
        listHeading: 'Popular Movies'
      })
    }
  }

  handleNextClick() {
    this.setState({ pageNum: this.state.pageNum + 1 }, () => this.loadMovies());
  }

  isNextDisabled() {
    return this.state.pageNum + 1 > this.state.resultCount.pageCount;
  }

  handlePreviousClick() {
    this.setState({ pageNum: this.state.pageNum - 1 }, () => this.loadMovies());
  }

  isPreviousDisabled() {
    return this.state.pageNum - 1 <= 0;
  }

  render() {
    const {
      movies,
      resultCount,
      listHeading
    } = this.state;

    return (
      <div>
        <Search value={this.state.currentSearch} onChange={this.handlSearchChange.bind(this)}/>
        <h2 className="list-heading">{listHeading}</h2>
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
          <button onClick={this.handlePreviousClick.bind(this)} disabled={this.isPreviousDisabled()}>
            Previous
          </button>
          Page {resultCount.page} of {resultCount.pageCount}
          <button onClick={this.handleNextClick.bind(this)} disabled={this.isNextDisabled()}>
            Next
          </button>
          </div>
      </div>
    )
  }
}

export default List;
