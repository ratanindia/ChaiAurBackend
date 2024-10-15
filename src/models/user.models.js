import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username:{
        type:String,
        trim: true,
        index:true,
        required:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        trim: true,
        required:true,
        lowercase:true,
        unique:true
    },
    fullname:{
        type:String,
        trim: true,
        index:true,
        required:true,
    },
    avatar:{
        type:String, // cloudinary file codes
        required:true,
    },
    coverImages:{
        type:String, // cloudinary files
        required:true,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    refreshToken:{type:String},
    
},
{
    timestamps:true
})


// password encryption method codes

userSchema.pre("save",  async function (next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        fullname: this.fullname,
        email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
})
}

export const User = mongoose.model("User", userSchema)