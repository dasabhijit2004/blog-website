const Blog = require('../models/Blog');

// Save or update a draft
exports.saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: 'draft', updatedAt: new Date() },
        { new: true }
      );
    } else {
      blog = await Blog.create({ title, content, tags, status: 'draft' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save draft', error: err.message });
  }
};

// Publish a blog
exports.publishBlog = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: 'published', updatedAt: new Date() },
        { new: true }
      );
    } else {
      blog = await Blog.create({ title, content, tags, status: 'published' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to publish blog', error: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve blogs', error: err.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve blog', error: err.message });
  }
};
