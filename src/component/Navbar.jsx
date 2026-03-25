import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Assets
import Logo from "../assets/Logo.png";
import SmolLogo from "../assets/Smol-logo.png";
import UserImg from "../assets/thumbs/user-pp.png";
import DropdownButton from "../assets/Vector.png";
import ProfileIcon from "../assets/profile.png";
import StarsIcon from "../assets/stars.png";
import LogoutIcon from "../assets/logout.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header>
      <nav className="content-padding-lr">
        {/* Left side - logo + links */}
        <div className="menu-container">
          <Link to="/">
            <img
              className="logo hidden-on-mobile"
              src={Logo}
              alt="chill-logo"
            />
            <img
              className="smol-logo hidden-on-desktop"
              src={SmolLogo}
              alt="chill-logo"
            />
          </Link>

          <Link className="text-md font-semibold" to="/series">
            Series
          </Link>

          <Link className="text-md font-semibold" to="/film">
            Film
          </Link>

          <Link className="text-md font-semibold" to="/register">
            Daftar Saya
          </Link>
        </div>

        {/* Right side - profile + dropdown */}
        <div className="profile-container" ref={dropdownRef}>
          <div className="user-image-wrapper">
            <a href="">
              <img className="user-icon" src={UserImg} alt="user" />
            </a>

            <button
              className={`dropdown-btn ${isDropdownOpen ? "rotate-up" : ""}`}
              onClick={toggleDropdown}
              type="button"
              aria-expanded={isDropdownOpen}
            >
              <img src={DropdownButton} alt="dropdown arrow" />
            </button>
          </div>

          {/* Dropdown menu */}
          <ul
            className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
            id="nav-dropdown"
          >
            <li>
              <img
                className="dropdown-icon"
                src={ProfileIcon}
                alt="profile icon"
              />
              <a href="https://stackoverflow.com">Profil Saya</a>
            </li>
            {/* Admin page */}
            <li>
              <img
                className="dropdown-icon"
                src={ProfileIcon}
                alt="profile icon"
              />
              <Link to="/admin">Admin page</Link>
            </li>
            <li>
              <img className="dropdown-icon" src={StarsIcon} alt="stars icon" />
              <a href="https://pixelsconverter.com">Ubah Premium</a>
            </li>
            <li>
              <img
                className="dropdown-icon"
                src={LogoutIcon}
                alt="logout icon"
              />
              <a className="user-login-menu" href="https://www.w3schools.com">
                Keluar
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
