import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogEditor from './components/BlogEditor';
import BlogList from './components/BlogList';
import EditBlog from './pages/EditBlog';
import Login from './components/Login';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<BlogEditor />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
