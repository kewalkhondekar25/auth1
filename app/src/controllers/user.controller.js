import asyncHandler from "../utils/asyncHandler.js";
import zod from "zod";
import { User } from "../models/user.model.js";

const registerUserValidation = zod.object({
    userName: zod.string().min(1),
    email: zod.string().min(1).email(),
    password: zod.string().min(3),
    fullName: zod.string().min(1),
});

const registerUser = asyncHandler( async (req, res) => {
    const registerUserInput = req.body;
    const validResponse = registerUserValidation.safeParse(registerUserInput);
    //existing user
    const existedUser = User.findOne({
        $or: [{userName}, {email}]
    })
    if(existedUser){
        return res.status(409).json({
            message: "user already exist"
        })
    };
    //images
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!validResponse.success){
        res.status(400).json({
            message: validResponse.error
        })
    }else{
        res.status(200).json({
            validResponse
        })
    }
});

export default registerUser