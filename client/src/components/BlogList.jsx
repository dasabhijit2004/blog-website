import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      toast.error('Failed to load blogs');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await API.delete(`/blogs/${id}`);
      toast.success('Blog deleted!');
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err) {
      toast.error('Failed to delete blog');
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>

      {blogs.length === 0 && <p className="text-gray-500">No blogs available.</p>}

      {blogs.map(blog => (
        <div key={blog._id} className="border p-4 mb-4 rounded-md shadow bg-white">
          <h3 className="text-xl font-bold">{blog.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{blog.status.toUpperCase()}</p>
          <p className="mb-2">{blog.content.slice(0, 150)}...</p>

          <div className="flex gap-4 mt-3">
            <button
              onClick={() => handleEdit(blog._id)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(blog._id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
