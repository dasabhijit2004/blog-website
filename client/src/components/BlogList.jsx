import React, { useEffect, useState } from 'react';
import API from '../services/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('/blogs').then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
      {blogs.map(blog => (
        <div key={blog._id} className="border p-4 mb-2">
          <h3 className="text-xl font-bold">{blog.title}</h3>
          <p>{blog.status.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
