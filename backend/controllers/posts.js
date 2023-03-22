import Post from "../models/Post.js"
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        const { user_id, firstName, lastName, description, image64, isProfile } = req.body;
        const user = await User.findById(user_id)
        const newPost = new Post({
            user_id,
            firstName,
            lastName,
            description,
            image64,
            likes: {},
            comments: []
        })
        await newPost.save()
        const post = await Post.find()
        res.status(201).json(post)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { user_id } = req.params
        const post = await Post.find( { user_id })
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { user_id } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(user_id)

        if (isLiked) {
            post.likes.delete(user_id)
        } else {
            post.likes.set(user_id, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const commentPost = async (req, res) => {
    try {
        const { id } = req.params
        const { user_id, name, comment, userPicture } = req.body
        const commentToAdd = {
            "user_id" : user_id,
            "name": name,
            "comment": comment,
            "userPicture": userPicture
        } 

        const post = await Post.findById(id)
        post.comments.push(commentToAdd)
        const updatedPost = await post.save()
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

// DELETE
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.body
        const deletedPost = await Post.deleteOne({ _id: postId })
        res.status(200).json(postId) 
    } catch (error) {
        res.status(403).json({ message: error.message})
    }
}