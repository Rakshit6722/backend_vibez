const User = require('../models/User')
const Posts = require('../models/Posts')
const bcrypt = require('bcrypt')
const photoUploader = require('../utils/photoUploader')

exports.signUp = async (req, res) => {
    try{
        const {userName, email, password} = req.body
        const profilePicture = req?.files?.file

        if(!userName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const userEmail = await User.findOne({email})
        if(userEmail){
            return res.status(400).json({message:"User already exists"})
        }
        const findUserName = await User.findOne({userName})
        if(findUserName){
            return res.status(400).json({message:"Username already exists"})
        }

        if(profilePicture){
            try{
                var url = await photoUploader(profilePicture)
                console.log("url",url)
            }catch(err){
                console.log(err)
                console.log("Error uploading profile Image")
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            userName,
            email,
            password:hashedPassword,
            profilePicture:url?url: "",
        })

        return res.status(201).json({
            success:true,
            data:user,
            message:"User created successfully",
        })


    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

exports.logIn = async(req,res) => {
    try{
        const {userName, password} = req.body
        if(!userName || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({userName})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}