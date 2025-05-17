const express = require('express');
const router = express.Router();
const {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog
} = require('../controllers/blogController');

const auth = require('../middleware/auth'); // JWT authentication middleware

// 🚫 Public Routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// 🔐 Protected Routes (require JWT token in header)
router.post('/save-draft', auth, saveDraft);
router.post('/publish', auth, publishBlog);

// Delete a blog
router.delete('/:id', auth, deleteBlog);

module.exports = router;
