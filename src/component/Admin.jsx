import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// page styling import
import "../movieTable.css";

import GenericCard from "./props/GenericCard.jsx";
import axios from "axios";
import useFetchData from "../api/useFetchData.jsx";
import API_URL from "../api/apiUrl.jsx";

// Default banner image import

const Admin = () => {
  // miscs functions
  function toggler(toggleSetter, ...closeSetters) {
    if (toggleSetter) toggleSetter((prev) => !prev);

    closeSetters.forEach((setter) => {
      if (setter) {
        setter(false);
      }
    });
  }

  // fetch data
  const { data, loading, error, mutate } = useFetchData("products");

  const [movies, setMovies] = useState();

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  // post data

  const [newData, setNewData] = useState({
    image: "",
    poster: "",
    title: "",
    ageRating: "",
    rating: "",
    id: "",
    description: "",
  });

  const postDataHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/products`, newData);
      console.log("Item added successfully!", res.data);
      // reset input values

      setNewData({
        image: "",
        poster: "",
        title: "",
        ageRating: "",
        rating: "",
        id: "",
        description: "",
      });
      mutate();
    } catch (error) {
      console.log("Failed to add item!", error.message);
    }
  };

  return (
    <section className="admin-section content-padding-lr">
      <div className="admin-info">
        <h1 className="admin-greeting-title">Welcome {name || "Admin"}!</h1>
        <button className="change-username-btn">Change your name</button>
        <button className="blue-btn add-new">+ Add New Item</button>

        {
          <div className="input-new-item-section section-padding">
            <h1>Add new item</h1>
            <form className="input-new-item-form" onSubmit={postDataHandler}>
              <input
                type="text"
                placeholder="Input image link here..."
                value={newData.image}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, image: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Input poster link here..."
                value={newData.poster}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, poster: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Input title here..."
                value={newData.title}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Input description here..."
                value={newData.description}
                onChange={(e) =>
                  setNewData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Input age rating here..."
                value={newData.ageRating}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, ageRating: e.target.value }))
                }
                required
              />
              <input
                type="text"
                placeholder="Input rating here"
                value={newData.rating}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, rating: e.target.value }))
                }
                required
              />
              <button className="submit-btn">Submit</button>
              <button className="cancel-square-btn" type="button">
                Cancel
              </button>
            </form>
          </div>
        }

        <div className="input-new-item-section section-padding">
          <h1>Edit item</h1>
          <form className="input-new-item-form">
            <input
              type="text"
              placeholder="Input image link here..."
              value={newData.image}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, image: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Input poster link here..."
              value={newData.poster}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, poster: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Input title here..."
              value={newData.title}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Input description here..."
              value={newData.description}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Input age rating here..."
              value={newData.ageRating}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, ageRating: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Input rating here"
              value={newData.rating}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, rating: e.target.value }))
              }
            />
            <button className="submit-btn">Submit</button>
            <button className="cancel-square-btn" type="button">
              Cancel
            </button>
          </form>
        </div>
      </div>
      <div className="movie-card-container section-padding ">
        {/* <VerticalCardSmol image={defaultPoster} /> */}
        <div className="movie-card-wrapper">
          {error && <h2>Error occurred: {error}</h2>}
          {loading && <h2>Loading...</h2>}
          {!loading && !error && movies?.length === 0 && (
            <h1>Nothing to see here...</h1>
          )}
          {!loading &&
            !error &&
            movies?.length > 0 &&
            movies.map((movie) => (
              <GenericCard
                key={movie.id}
                id={movie.id}
                image={movie.poster}
                title={movie.title}
                description={movie.description}
                rating={movie.rating}
                ageRating={movie.ageRating}
              />
            ))}
        </div>
      </div>

      {/* Dangerous section */}
      <div className="danger-section">
        <h2 className="danger-section-title">Dangerous Section</h2>
        <p className="danger-section-desc">
          Think twice before hitting these red buttons below...
        </p>
        <h4 className="danger-button-cont-title">Nuke buttons:</h4>
        <div className="danger-button-container">
          <button className="red-btn reset">Delete All</button>
          <button className="red-btn reset">Reset data to default</button>
        </div>
      </div>
    </section>
  );
};

export default Admin;
