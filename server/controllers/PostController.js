import PostModel from "../models/postModel.js"



export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
};



// get a post 
export const getPost = async (req, res) => {
    const id =  req.params.id;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};



// update post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(postId);

        if (post.userId === userId) {
            await post.updatePost({ $set: req.body });
            res.status(200).json("Post updated!");
        } else {
            res.status(403).json("Authentication failed");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};



// delete a post 
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);

        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted.");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}



// like/dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post disliked")
        } else {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};



// Get timeline posts
export const getTimelinePosts = async (req, res) => {
    
}