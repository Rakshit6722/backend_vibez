const cloudinary = require('cloudinary').v2;

const photoUploader = async(file)=>{
    const folder = 'vibez'
    try{
        const uploadedImage = await cloudinary.uploader.upload(file.tempFilePath, {folder:folder})
        return uploadedImage.secure_url
    }catch(err){
        console.log(err)
        console.log("Error uploading image")
    }
}

module.exports = photoUploader
