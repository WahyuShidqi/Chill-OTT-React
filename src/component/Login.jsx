import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import EyeOffIcon from "../assets/eye-off.png";
import GoogleIcon from "../assets/google-icon.png";

const Login = () => {
  return (
    <>
      <section className="login-section">
        <form action="" className="login-form">
          <div className="form-container">
            <div className="welcome-wrapper">
              <img src={Logo} alt="Chill.png" />
              <p className="heading">Masuk</p>
              <p>Selamat datang kembali!</p>
            </div>
            <div className="username-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Masukkan username"
                required=""
              />
            </div>
            <div className="password-wrapper">
              <label htmlFor="password">Kata Sandi</label>
              <input
                type="password"
                id="password"
                placeholder="Masukkan kata sandi"
                required=""
              />
              <button type="button" className="password-toggle">
                <img src={EyeOffIcon} alt="eye-off.png" />
              </button>
              <div className="user-option-wrapper">
                <p>
                  Belum punya akun?
                  <Link className="font-bold" to="/register">
                    Daftar
                  </Link>
                </p>
                <a href="">Lupa kata sandi?</a>
              </div>
            </div>
            <div className="submit-form-wrapper">
              <button className="login-btn" type="submit">
                Masuk
              </button>
              <p>Atau</p>
              <button className="login-google-btn">
                <img src={GoogleIcon} alt="google-icon.png" />
                Masuk dengan Google
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
