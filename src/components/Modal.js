import React from "react";

const Modal = ({ showModalData, closeModal }) => {
  if (!showModalData) {
    return null;
  }
  const regularUrl = showModalData.movie.youtube_trailer;
  const videoId = regularUrl.split("v=")[1];
  const embeddableUrl = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={closeModal}
        >
          x
        </button>
        {showModalData && (
          <div>
            <img
              className="w-20"
              src={showModalData.movie.poster_path}
              alt={showModalData.movie.original_title}
            />
            <h1 className="font-bold text-xl">
              {showModalData.movie.original_title}
            </h1>
            <p className="font-bold text-xl">
              {showModalData.movie.vote_average}
            </p>
            {regularUrl ? (
              <iframe
                width="560"
                height="315"
                src={embeddableUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No trailer available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
