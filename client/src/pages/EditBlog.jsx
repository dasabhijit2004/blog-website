import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import BlogEditor from '../components/BlogEditor';

const EditBlog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlogData(res.data);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  return blogData ? <BlogEditor initialData={blogData} /> : <p className="text-center mt-10">Loading blog...</p>;
};

export default EditBlog;
