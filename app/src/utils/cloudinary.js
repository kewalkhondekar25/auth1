import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload file to cloud
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})
        return response;
    } catch (error) {
        //remove locally save temp file on fail upload
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export default uploadOnCloudinary;
