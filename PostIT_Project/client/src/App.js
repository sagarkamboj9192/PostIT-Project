import './App.css';
import Home from './pages/Home';
// import axios from "axios";
// import { useEffect, useState } from "react";
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/LoginPage';
import Register from './pages/Registrationpage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/createpost">Create a Post</Link>
          {!localStorage.getItem("gettoken") && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Register</Link>
            </>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path="/post/:id" element={<Post/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;