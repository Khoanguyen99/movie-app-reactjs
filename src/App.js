import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=423987e916cb2521b184e67e44a5bc95";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=423987e916cb2521b184e67e44a5bc95&query=";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovie(FEATURED_API);
  }, []);

  function getMovie(api) {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
      });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (searchTerm) {
      getMovie(SEARCH_API + searchTerm);
      setSearchTerm("");
    }
  }

  function handleOnChange(e) {
    setSearchTerm(e.target.value);
  }
  return (
    <>
      <header>
        <p className="logo-name">Khoa Nguyen</p>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search movie..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
