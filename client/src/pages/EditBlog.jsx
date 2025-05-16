import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    API.get(`/blogs/${id}`).then((res) => setBlog(res.data));
  }, [id]);

  return blog ? <div>{blog.title}</div> : <p>Loading...</p>;
};

export default EditBlog;
