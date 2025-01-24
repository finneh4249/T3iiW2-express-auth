const Post = require('../models/PostModel');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error getting posts'});
        
    }
}

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = {
            title,
            content,
            author: req.authUserData.userId
        };
        const post = await Post.create(newPost);
        res.status(201).json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
        
    }
}

module.exports = { getAllPosts, createPost };