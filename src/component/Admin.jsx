import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// page styling import
import "../movieTable.css";

import movieDB from "../data/movieDB.js";
import GenericCard from "./props/GenericCard.jsx";

// Default banner image import
import defaultBannerImg from "../assets/movieImages/AFTER.jpg";

const Admin = () => {
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  let hasAsked = useRef(false);

  // Admin login mockup

  useEffect(() => {
    if (hasAsked.current) return;
    hasAsked.current = true;

    const password = import.meta.env.VITE_ADMIN_PASSWORD;
    let inputPassword = prompt(
      "Enter your password. This is silly login mockup. just for fun. Pass: admin",
    );
    // console.log(
    //   "inputted value",
    //   inputPassword,
    //   password,
    //   inputPassword === password,
    // );

    if (inputPassword === password) {
      setIsVerified(true); // Ignore React complaining about calling setState inside useEffect, although they are right :D
    } else {
      alert("Wrong password! redirecting to homepage...");
      navigate("/", { replace: true });
      return;
    }
    // alert(`Welcome administrator!...`);
  }, [navigate]);

  const defaultPoster =
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180";
  const defaultBanner = defaultBannerImg;

  const [isAdminChangeVis, setIsAdminChangeVis] = useState(false);
  //const [isEditVisible, setIsEditVisible] = useState(false);
  const [isAddItemVisible, setIsAddItemVisible] = useState(false);

  const [name, setName] = useState(getSavedName());
  const inputRef = useRef(null);

  function changeNameHandler(e) {
    e.preventDefault();

    const value = inputRef.current.value;
    //if (!value) return;

    setName(value);
    localStorage.setItem("adminName", JSON.stringify(value));
    setIsAdminChangeVis(false);
  }

  function getSavedName() {
    const savedName = localStorage.getItem("adminName");
    return JSON.parse(savedName);
  }

  function toggler(toggleSetter, ...closeSetters) {
    if (toggleSetter) toggleSetter((prev) => !prev);

    closeSetters.forEach((setter) => {
      if (setter) {
        setter(false);
      }
    });
  }

  // getting data
  const [movieData, setMovieData] = useState(getMovieData());

  function getMovieData() {
    const moviesList = localStorage.getItem("movieData");
    if (!moviesList || moviesList === "undefined") {
      //localStorage.setItem("movieData", JSON.stringify([]));
      return [];
    }
    //console.log(JSON.parse(moviesList));
    return JSON.parse(moviesList);
  }

  //static data
  const defaultMovieListData = movieDB;

  function resetDefault() {
    setMovieData([...defaultMovieListData]);
  }

  //localStorage data

  //deleteDataHandler
  function deleteDataHandler(id) {
    setMovieData((prevData) => prevData.filter((movie) => movie.id !== id));
  }

  const newTitleRef = useRef(null);
  const newDescriptionRef = useRef(null);
  const newAgeRatingRef = useRef(null);
  const newRatingRef = useRef(null);

  //Delete all handler
  function deleteAllHandler() {
    if (movieData.length < 1) {
      alert("Nothing to delete...");
      return;
    }
    let isConfirmed = confirm(
      "Are you sure? You're about to delete all your datas",
    );
    if (isConfirmed) {
      setMovieData([]);
      return;
    }
  }

  function addDataHandler(e) {
    e.preventDefault();
    const newId =
      movieData.length > 0 ? movieData[movieData.length - 1].id + 1 : 1;
    //console.log(newId);
    const newImage = defaultBanner;
    const newPoster = defaultPoster;
    const newTitle = newTitleRef.current.value;
    const newDescription = newDescriptionRef.current.value;
    const newAgeRating = newAgeRatingRef.current.value;
    const newRating = newRatingRef.current.value;

    const newData = {
      id: newId,
      image: newImage,
      poster: newPoster,
      title: newTitle || "Unknown",
      description: newDescription || "Unknown...",
      ageRating: newAgeRating || 0,
      rating: newRating || 0,
    };

    //console.log("new data being pushed", newData);

    setMovieData([...movieData, newData]);
    setIsAddItemVisible(false);
    alert("New item succesfully added...");
  }

  //edit data handler

  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [initialValue, setInitialValue] = useState({
    title: "",
    description: "",
    ageRating: "",
    rating: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState();
  const [readOnlyToggle, setReadOnlyToggle] = useState(true);

  const editTitleRef = useRef(null);
  const editDescriptionRef = useRef(null);
  const editAgeRatingRef = useRef(null);
  const editRatingRef = useRef(null);

  function startEditingHandler(id) {
    const existingData = movieData.find((data) => data.id === id);
    setIsEditFormVisible(true);
    setIsAddItemVisible(false);
    setIsAdminChangeVis(false);

    setFormData(existingData);
    //console.log("Existing data...", existingData);

    // setInitialValue({
    //   title: existingData.title,
    //   description: existingData.description,
    //   ageRating: existingData.ageRating,
    //   rating: existingData.rating,
    // });

    setEditingId(id);
  }

  // console.log("FormData", formData);
  //console.log("InitialVaue:", initialValue);

  function editDataHandler(e) {
    console.log("editDataHandler function is running...");
    e.preventDefault();
    // console.log(formData);
    // console.log(editTitleRef.current.value);
    const updatedData = {
      title: editTitleRef.current.value,
      description: editDescriptionRef.current.value,
      ageRating: editAgeRatingRef.current.value,
      rating: editRatingRef.current.value,
    };

    console.log("updated", updatedData);

    setMovieData((prevData) =>
      prevData.map((data) => {
        if (data.id === editingId) {
          console.log("Data being edited...", data);
          const updatedNewData = { ...data, ...updatedData };
          console.log("Data after updated...", updatedNewData);
          return updatedNewData;
        }

        return data;
      }),
    );

    setEditingId(null);
    setFormData({});
    setIsEditFormVisible(false);

    console.log("updatedData:", movieData);
  }

  // }

  useEffect(() => {
    localStorage.setItem("movieData", JSON.stringify(movieData));
  }, [movieData]);

  if (!isVerified) {
    return (
      <>
        <div className="content-padding-lr section-padding">
          <h1 className="empty-placeholder">You're not admin...</h1>
        </div>
      </>
    );
  }

  return (
    <section className="admin-section content-padding-lr">
      <div className="admin-info">
        <h1 className="admin-greeting-title">Welcome {name || "Admin"}!</h1>
        <button
          className="change-username-btn"
          onClick={() =>
            toggler(
              setIsAdminChangeVis,
              setIsAddItemVisible,
              setIsEditFormVisible,
            )
          }
        >
          Change your name
        </button>
        <button
          className="blue-btn add-new"
          onClick={() =>
            toggler(
              setIsAddItemVisible,
              setIsAdminChangeVis,
              setIsEditFormVisible,
            )
          }
        >
          + Add New Item
        </button>

        {isAddItemVisible ? (
          <div className="input-new-item-section section-padding">
            <h1>Add new item</h1>
            <form className="input-new-item-form" onSubmit={addDataHandler}>
              <input
                ref={newTitleRef}
                type="text"
                placeholder="Input title here..."
              />
              <input
                ref={newDescriptionRef}
                type="text"
                placeholder="Input description here..."
              />
              <input
                ref={newAgeRatingRef}
                type="text"
                placeholder="Input age rating here..."
              />
              <input
                ref={newRatingRef}
                type="text"
                placeholder="Input rating here"
              />
              <button className="submit-btn">Submit</button>
              <button
                className="cancel-square-btn"
                type=""
                onClick={() => setIsAddItemVisible(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}

        {isEditFormVisible ? (
          <div className="input-new-item-section section-padding">
            <h1>Edit item</h1>
            <form
              key={editingId}
              className="input-new-item-form"
              onSubmit={editDataHandler}
            >
              <input
                ref={editTitleRef}
                defaultValue={formData?.title}
                type="text"
                placeholder="Input title here..."
              />
              <input
                ref={editDescriptionRef}
                defaultValue={formData?.description}
                type="text"
                placeholder="Input description here..."
              />
              <input
                ref={editAgeRatingRef}
                defaultValue={formData?.ageRating}
                type="text"
                placeholder="Input age rating here..."
              />
              <input
                ref={editRatingRef}
                defaultValue={formData?.rating}
                type="text"
                placeholder="Input rating here"
              />
              <button className="submit-btn">Submit</button>
              <button
                className="cancel-square-btn"
                type=""
                onClick={() => setIsEditFormVisible(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
        {isAdminChangeVis ? (
          <>
            <form
              className="change-username-form"
              action=""
              onSubmit={changeNameHandler}
            >
              <input
                className="change-username-input"
                ref={inputRef}
                defaultValue={name}
                type="text"

                //onChange={(e) => setName(e.target.value)}
              />
              <button className="change-username-btn green" type="submit">
                Change
              </button>
            </form>
            <button
              className="red-btn"
              onClick={() => setIsAdminChangeVis(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="movie-card-container section-padding ">
        {/* <VerticalCardSmol image={defaultPoster} /> */}
        <div className="movie-card-wrapper">
          {movieData.length > 0 ? (
            movieData?.map((movie, idx) => {
              return (
                <GenericCard
                  id={movie.id}
                  key={movie.id}
                  image={movie.poster}
                  title={movie.title}
                  description={movie.description}
                  rating={movie.rating}
                  ageRating={movie.ageRating}
                  deleteHandler={() => deleteDataHandler(movie.id)}
                  editHandler={() => startEditingHandler(movie.id)}
                />
              );
            })
          ) : (
            <>
              <h1>Nothing to see here...</h1>
            </>
          )}
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
          <button className="red-btn reset" onClick={() => deleteAllHandler()}>
            Delete All
          </button>
          <button className="red-btn reset" onClick={() => resetDefault()}>
            Reset data to default
          </button>
        </div>
      </div>
    </section>
  );
};

export default Admin;
