import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// page styling import
import "../movieTable.css";

import sonic2 from "../assets/movieImages/sonic2.png";
import sonic2Poster from "../assets/movieImages/sonic2-poster.png";

const movies = [
  {
    image: sonic2,
    poster: sonic2Poster,
    title: "Sonic the Hedgehog 2",
    description:
      "Sonic settles into life on Earth but longs to prove he is a true hero. His peace is shattered when Dr. Robotnik returns with a powerful new partner, Knuckles. Sonic teams up with Tails on a high-speed adventure to protect an ancient emerald that can reshape the world. It is exciting, energetic, and full of heart.",
    ageRating: "7+",
    rating: "4.1",
  },
];

const Admin = () => {
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  let hasAsked = useRef(false);

  // Admin login mockup
  //     useEffect(() => {
  //       if (hasAsked.current) return;
  //       hasAsked.current = true;

  //       const password = import.meta.env.VITE_ADMIN_PASSWORD;
  //       let inputPassword = prompt("Enter your password");
  //       console.log(
  //         "inputted value",
  //         inputPassword,
  //         password,
  //         inputPassword === password,
  //       );

  //       if (inputPassword === password) {
  //         setIsVerified(true);
  //       } else {
  //         alert("Wrong password! redirecting to homepage...");
  //         navigate("/", { replace: true });
  //         return;
  //       }
  //       alert(`Welcome administrator!...`);
  //     }, [navigate]);

  //   if (!isVerified) {
  //     return (
  //       <>
  //         <div>
  //           <h1>You're not admin</h1>
  //         </div>
  //       </>
  //     );
  //   }

  const [isAdminChangeVis, setIsAdminChangeVis] = useState(false);

  const [name, setName] = useState("");
  const inputRef = useRef(null);

  function changeNameHandler(e) {
    e.preventDefault();

    const value = inputRef.current.value;

    if (!value) return;

    setName(value);
    setIsAdminChangeVis(false);
  }

  return (
    <section>
      <div className="admin-info">
        <h1>Welcome {name || "Admin"}</h1>
        <button onClick={() => setIsAdminChangeVis(true)}>
          Change your name
        </button>
        {isAdminChangeVis ? (
          <>
            <form action="" onSubmit={changeNameHandler}>
              <input
                ref={inputRef}
                defaultValue={name}
                type="text"

                //onChange={(e) => setName(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
            <button onClick={() => setIsAdminChangeVis(false)}>Cancel</button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="table-container">
        <table className="movie-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Poster</th>
              <th>Title</th>
              <th>Description</th>
              <th>Age Rating</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="thumbnail"
                  />
                </td>
                <td>
                  <img
                    src={movie.poster}
                    alt={`${movie.title} Poster`}
                    className="poster"
                  />
                </td>
                <td>{movie.title}</td>
                <td className="description-cell">{movie.description}</td>
                <td>{movie.ageRating}</td>
                <td>{movie.rating} ★</td>
                <td className="actions">
                  <button className="btn create">Create</button>
                  <button className="btn edit">Edit</button>
                  <button className="btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Admin;
