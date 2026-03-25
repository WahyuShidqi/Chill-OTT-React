import React, { useState } from "react";

const GenericCard = (prop) => {
  // const [isReadOnly, setIsReadOnly] = useState(prop.isReadOnly);

  return (
    <div className="movie-card">
      <div className="movie-card-img">
        <img src={prop.image} alt="movie.png" />
      </div>
      <div className="movie-card-info">
        <div className="movie-card-title">
          <h2>{prop.title}</h2>
        </div>
        <div className="movie-card-desc">
          <p
            className="genericCard-textarea"
            placeholder="Movie description..."
          >
            {prop.description}
          </p>
        </div>
        <div className="movie-card-ratings">
          <p>Rating: {prop.rating}/5</p>
          <p>Age Rating: {prop.ageRating}+</p>
        </div>
        <div className="buttons">
          <button className="green-btn" onClick={prop.editHandler}>
            Edit
          </button>
          <button className="red-btn delete-btn" onClick={prop.deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericCard;
