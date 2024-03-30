import asyncHandler from "../utils/asyncHandler.js";
import zod from "zod";
import { User } from "../models/user.model.js";

const registerUserValidation = zod.object({
    username: zod.string().min(1),
    email: zod.string().min(1).email(),
    password: zod.string().min(3),
    fullName: zod.string().min(1),
});

//register user
const registerUser = asyncHandler( async (req, res) => {
    const registerUserInput = req.body;
    const validResponse = registerUserValidation.safeParse(registerUserInput);
    const payload = validResponse.data;
    const {username, email} = payload;
    
    //validation
    if(!validResponse.success){
        return res.status(400).json({
            message: validResponse.error
        })
    };
    //already exist user
    const existUser = await User.findOne({
        $or: [{username}, {email}]
    });
    if(existUser){
        return res.status(409).json({
            message: "User with username or email already exists"
        });
    };
    //creating entry
    await User.create(payload);
    return res.status(200).json({
        message: "User created successfully"
    });
});

//login user
const loginUser = asyncHandler( async (req, res) => {
    //req-body
    const {username, email, password} = req.body;
    //username or email req
    if(!username || !email){
        return res.status(400).json({
            message: "Username or Email required"
        })
    };
    //find user
    const fetchUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(!fetchUser){
        return res.status(404).json({
            message: "User does not exist"
        })
    };
    //password check
    const isPwdValid = await fetchUser.isPasswordCorrect(password);
    if(!isPwdValid){
        return res.status(401).json({
            message: "Invalid User Credentials"
        })
    }
    //access & refresh token
    
    //send to cookies
});

export {registerUser, loginUser}