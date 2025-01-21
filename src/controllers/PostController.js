const getAllPosts = async (req, res) => {
    res.json({ message: 'Get All Posts'});
}

const createPost = async (req, res) => {
    res.json({message: 'Create Post'});
}

module.exports = { getAllPosts, createPost };