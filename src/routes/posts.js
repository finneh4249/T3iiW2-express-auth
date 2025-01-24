const express = require('express');
const router = express.Router();
const { validateToken } = require('../middleware/authMiddleware');

const { getAllPosts, createPost } = require('../controllers/PostController');

router.use(validateToken);

router.get("/", getAllPosts);
router.post("/", createPost);

module.exports = router;

