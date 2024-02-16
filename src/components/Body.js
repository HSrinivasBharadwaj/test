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
      <div className="flex-col m-5  md:flex-row lg:flex-row xl:flex-row flex justify-center items-center">
        <label
          htmlFor="startDate"
          className="mx-3 my-2 md:my-3 lg:my-3 xl:my-3"
        >
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          className="border border-gray-500 p-1 rounded-md mt-2 md:mt-0 lg:mt-0 xl:mt-0"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate" className="mx-3 my-2 md:my-3 lg:my-3 xl:my-3">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          className="border border-gray-500 p-1 rounded-md mt-2 md:mt-0 lg:mt-0 xl:mt-0"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={handleFilterSubmit}
          className="bg-blue-500 text-white p-2 rounded-md ml-2 mt-2 md:mt-0 lg:mt-0 xl:mt-0"
        >
          Submit
        </button>
      </div>
      <div className=" md:mx-32 lg:mx-32 xl:mx-32 my-10">
        <div className=" flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between md:flex-wrap lg:flex-wrap xl:flex-wrap mb-4">
          {filteredMovie.length === 0 ? (
            <p>No movies found within the specified date range.</p>
          ) : (
            filteredMovie.map((movie) => {
              return (
                <div
                  className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3"
                >
                  <MovieList movie={movie} key={movie.id}/>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
