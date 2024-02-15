import React, { useEffect, useState } from "react";
import useFetchMovieDetails from "../hooks/useFetchMovieDetails";
import MovieList from "./MovieList";

const Body = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredMovie, setFilteredMovie] = useState([]);
  const { movieData, loading, error } = useFetchMovieDetails();
  const { movies } = movieData;

  //   Initial render display all the movies
  useEffect(() => {
    if (movies) {
      setFilteredMovie(movies);
    }
  }, [movies]);

  if (loading || !movies || movies.length === 0) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleMovieChange = (e) => {
    const inputValue = e.target.value;
    setSearchMovie(inputValue);
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredMovie(filteredMovies);
  };

  const handleFilterSubmit = () => {
    const filteredMovies = movies.filter((movie) => {
      //Converting the each movie into the date object
      const movieDate = new Date(movie.release_date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return movieDate >= start && movieDate <= end;
      }
      return true;
    });

    setFilteredMovie(filteredMovies);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter the name of the movie"
        className="border border-gray-500 p-1 w-96 rounded-md mt-5 mx-auto flex items-center"
        value={searchMovie}
        onChange={handleMovieChange}
      />
      <div className="flex-col mt-5 mx-0 md:flex-row lg:flex-row xl:flex-row flex justify-center">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          className="border border-gray-500 p-1 rounded-md mx-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          className="border border-gray-500 p-1 rounded-md mx-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={handleFilterSubmit}
          className="bg-blue-500 text-white p-2 rounded-md ml-2"
        >
          Submit
        </button>
      </div>
      <div className=" md:mx-32 lg:mx-32 xl:mx-32 my-10">
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between md:flex-wrap lg:flex-wrap xl:flex-wrap mb-4">
          {filteredMovie.map((movie) => {
            return (
              <div key={movie.id} className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
                <MovieList movie={movie} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;
