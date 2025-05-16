const express = require('express');
const router = express.Router();
const {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById
} = require('../controllers/blogController');

const auth = require('../middleware/auth'); // JWT authentication middleware

// 🚫 Public Routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// 🔐 Protected Routes (require JWT token in header)
router.post('/save-draft', auth, saveDraft);
router.post('/publish', auth, publishBlog);

module.exports = router;
