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
  //*========================= fetch data ===============================
  const { data, loading, error, mutate } = useFetchData("products"); // CUSTOM HOOKS

  const [movies, setMovies] = useState();

  useEffect(() => {
    if (data) {
      setMovies(data);
    }
  }, [data]);

  //*================================== post data ==================================
  const [isAddingData, setIsAddingData] = useState(false);

  const [newData, setNewData] = useState({
    image: "",
    poster: "",
    title: "",
    ageRating: "",
    rating: "",
    description: "",
  });

  const postDataHandler = async (e) => {
    e.preventDefault();
    if (
      Number.isNaN(Number(newData.rating)) ||
      Number.isNaN(Number(newData.ageRating))
    ) {
      alert("Rating or age rating input must be a number!");
      return;
    }
    if (Number(newData.rating) > 5) {
      alert("Max rating value is 5!");
      setNewData((prev) => ({ ...prev, rating: "5" }));
      return;
    }

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
        description: "",
      });
      mutate();
    } catch (error) {
      console.log("Failed to add item!", error.message);
    }
  };

  //*================================ EDIT DATA ====================================
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState(null);
  const startEditingHandler = (movie) => {
    setEditId(movie.id);
    toggler(setIsEditing(true), setIsAddingData);
    setEditData({
      image: movie.image,
      poster: movie.poster,
      title: movie.title,
      ageRating: movie.ageRating,
      rating: movie.rating,
      description: movie.description,
    });
  };

  const updateDataHandler = async (e) => {
    e.preventDefault();
    if (
      Number.isNaN(Number(editData.rating)) ||
      Number.isNaN(Number(editData.ageRating))
    ) {
      alert("Rating or age rating input must be a number!");
      return;
    }
    if (Number(editData.rating) > 5) {
      alert("Max rating value is 5!");
      setNewData((prev) => ({ ...prev, rating: "5" }));
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/products/${editId}`, editData);
      console.log("Data updated succesfully", res.data);
      mutate();
      setEditId(null);
      setIsEditing(false);
      setEditData({
        image: "",
        poster: "",
        title: "",
        ageRating: "",
        rating: "",
        description: "",
      });
    } catch (error) {
      console.log(`Failed to update data ${error.message}`);
    }
  };

  //*==================== DELETE DATA ========================
  const deleteHandler = async (movie) => {
    const confirmDeletion = confirm(
      `Are you sure? You're about to delete "${movie.title}" movie. You won't be able to recover it later!`,
    );

    if (!confirmDeletion) return;

    try {
      const res = await axios.delete(`${API_URL}/products/${movie.id}`);
      console.log(`Data has been deleted!`, res.data);
      mutate();
    } catch (error) {
      console.log(`Failed to delete data ${error.message}`);
    }
  };

  //*==================MISCS FUNCS==============================
  function toggler(toggleSetter, ...closeSetters) {
    if (toggleSetter) toggleSetter((prev) => !prev);

    closeSetters.forEach((setter) => {
      if (setter) {
        setter(false);
      }
    });
  }

  //*=================== Scroll behavior onclick ==================
  useEffect(() => {
    if (isEditing || editData) {
      document
        .getElementById("editFormSection")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [editData, isEditing]);

  return (
    <section className="admin-section content-padding-lr">
      <div className="admin-info">
        <h1 className="admin-greeting-title">Welcome {name || "Admin"}!</h1>
        {/* <button className="change-username-btn">Change your name</button> */}
        <button
          className="blue-btn add-new"
          onClick={() => toggler(setIsAddingData(true), setIsEditing)}
        >
          + Add New Item
        </button>

        {isAddingData ? (
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
                  setNewData((prev) => ({
                    ...prev,
                    ageRating: e.target.value,
                  }))
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
              <button
                className="cancel-square-btn"
                type="button"
                onClick={() => setIsAddingData(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}

        {isEditing ? (
          <div
            id="editFormSection"
            className="input-new-item-section section-padding"
          >
            <h1>Edit item</h1>
            <form className="input-new-item-form" onSubmit={updateDataHandler}>
              <input
                type="text"
                placeholder="Input image link here..."
                value={editData?.image}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, image: e.target.value }))
                }
              />

              <input
                type="text"
                placeholder="Input poster link here..."
                value={editData?.poster}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, poster: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Input title here..."
                value={editData?.title}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Input description here..."
                value={editData?.description}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Input age rating here..."
                value={editData?.ageRating}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    ageRating: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Input rating here"
                value={editData?.rating}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, rating: e.target.value }))
                }
              />
              <button className="submit-btn">Submit</button>
              <button
                className="cancel-square-btn"
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
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
                deleteHandler={() => deleteHandler(movie)}
                editHandler={() => startEditingHandler(movie)}
              />
            ))}
        </div>
      </div>

      {/* Dangerous section */}
      {/* <div className="danger-section">
        <h2 className="danger-section-title">Dangerous Section</h2>
        <p className="danger-section-desc">
          Think twice before hitting these red buttons below...
        </p>
        <h4 className="danger-button-cont-title">Nuke buttons:</h4>
        <div className="danger-button-container">
          <button className="red-btn reset">Delete All</button>
          <button className="red-btn reset">Reset data to default</button>
        </div>
      </div> */}
    </section>
  );
};

export default Admin;
