import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success("Login successful");
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
        <button type="submit" className="btn w-full">Log In</button>
      </form>
    </div>
  );
};

export default Login;
