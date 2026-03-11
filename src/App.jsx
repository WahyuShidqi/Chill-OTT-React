import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./component/Home.jsx";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer.jsx";
import Register from "./component/Register.jsx";
import Login from "./component/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
