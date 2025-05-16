import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">Blog Editor</h1>
      <div className="space-x-4">
        <Link to="/editor" className="btn">New Blog</Link>
        <Link to="/blogs" className="btn">View Blogs</Link>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Signup</Link>
      </div>
    </div>
  );
};

export default Home;
