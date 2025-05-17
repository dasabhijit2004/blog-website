const Blog = require('../models/Blog');

// Save or update a draft
async function saveDraft(req, res) {
  const { id, title, content, tags } = req.body;
  if (!title || !content || !title.trim() || !content.trim()) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

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
}

// Publish a blog
async function publishBlog(req, res) {
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
      // Otherwise, create new draft
      blog = await Blog.create({ title, content, tags, status: 'published' });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to publish blog', error: err.message });
  }
}


// Get all blogs
async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve blogs', error: err.message });
  }
}

// Get blog by ID
async function getBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve blog', error: err.message });
  }
}

// Delete a blog
async function deleteBlog(req, res) {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog', error: err.message });
  }
}

// Export all functions
module.exports = {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog
};
