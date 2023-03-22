import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: 5,
            max: 50
        },
        location: String,
        occupation: String,
        picture64: String,
        friends: {
            type: Array,
        },
        viewedProfile: Number,
    },
    { timestamps:true }
)

const User = mongoose.model("User", UserSchema)
export default User