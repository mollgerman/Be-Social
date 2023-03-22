import express from 'express'
import { createPost, getFeedPosts, getUserPosts, likePost, deletePost, commentPost } from '../controllers/posts.js'
import { verifyToken } from '../middlewares/auth.js'

const router = express.Router()

// POST
router.post("/post", verifyToken, createPost)

// READ
router.get("/", verifyToken, getFeedPosts)
router.get("/:user_id/posts", verifyToken, getUserPosts)

// UPDATE
router.patch('/:id/like', verifyToken, likePost)
router.patch('/:id/comment', verifyToken, commentPost)

// DELETE
router.delete('/post', verifyToken, deletePost)

export default router