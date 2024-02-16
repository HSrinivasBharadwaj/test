import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";

const MovieList = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalData, setShowModalData] = useState(null);

  const openModal = async (id) => {
    const options = {
      method: "GET",
      url: `https://movies-api14.p.rapidapi.com/movie/${id}`,
      headers: {
        "X-RapidAPI-Key": "f802934094mshd4e93c23daba25cp12715bjsn4ed2c7e6a10d",
        "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
      },
    };
    //Make the modal as true when the user clicks on the card
    setShowModal(true);
    try {
      const response = await axios.request(options);
      setShowModalData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setShowModalData(null);
  };

  return (
    <div>
      <div
        className="bg-white shadow-lg rounded-lg p-5 my-5 mx-5 h-auto cursor-pointer transition duration-300 ease-in-out transform hover:translate-y-2"
        onClick={() => openModal(movie._id)}
      >
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="rounded-t-lg"
        />
        <div className="p-2 md:p-4 lg:p-4 xl:p-4">
          <h1 className="text-xl font-semibold">{movie.title}</h1>
          <p className="text-sm text-gray-600">{movie.genres.join(", ")}</p>
          <p className="text-sm text-gray-600">{movie.release_date}</p>
        </div>
      </div>
      {showModal && (
        <Modal showModalData={showModalData} closeModal={closeModal} />
      )}
    </div>
  );
};

export default MovieList;
