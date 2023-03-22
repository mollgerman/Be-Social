import mongoose from "mongoose";

const PostScheema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            max: 200,
            default:""
        },
        image64: {
            type: String,
            default: "",
        },
        comments: {
            type: Array,
            default: []
        },
        likes: {
            type: Map,
            of: Boolean
        },
        
    },
    { timestamps: true }
)

const Post = mongoose.model("Post", PostScheema)
export default Post