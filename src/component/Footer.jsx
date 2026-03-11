import React from "react";
import Logo from "../assets/Logo.png";
const Footer = () => {
  return (
    <footer className="content-padding-lr">
      <div className="footer-container content-padding-ud">
        {/* icon */}
        <div className="footer-icon-wrapper">
          <img src={Logo} alt="logo.png" />
          <p className="copyright text-xsm">
            Copyright &copy;{new Date().getFullYear()} Chill All Rights
            Reserved`
          </p>
        </div>
        <div className="footer-menu-container">
          {/* genre */}
          <div className="footer-genre-wrapper">
            <h4 className="text-sm font-bold">Genre</h4>
            <div className="footer-genre-lists-cont">
              <ul className="text-sm font-semibold">
                <li>
                  <a href="">Aksi</a>
                </li>
                <li>
                  <a href="">Anak-anak</a>
                </li>
                <li>
                  <a href="">Anime</a>
                </li>
                <li>
                  <a href="">Britania</a>
                </li>
              </ul>
              <ul className="text-sm font-semibold">
                <li>
                  <a href="">Drama</a>
                </li>
                <li>
                  <a href="">Fantasi</a>
                </li>
                <li>
                  <a href="">Kejahatan</a>
                </li>
                <li>
                  <a href="">KDrama</a>
                </li>
              </ul>
              <ul className="text-sm font-semibold">
                <li>
                  <a href="">Komedi</a>
                </li>
                <li>
                  <a href="">Petualangan</a>
                </li>
                <li>
                  <a href="">Perang</a>
                </li>
                <li>
                  <a href="">Romantis</a>
                </li>
              </ul>
            </div>
          </div>
          {/* help */}
          <div className="footer-help-wrapper">
            <h4 className="text-sm font-bold">Bantuan</h4>
            <div className="footer-help-lists-cont">
              <ul className="text-sm font-semibold">
                <li>
                  <a href="">FAQ</a>
                </li>
                <li>
                  <a href="">Kontak kami</a>
                </li>
                <li>
                  <a href="">Privasi</a>
                </li>
                <li>
                  <a href="">Syarat &amp; Ketentuan</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
