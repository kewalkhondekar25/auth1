import asyncHandler from "../utils/asyncHandler.js";
import zod from "zod";

const registerUserValidation = zod.object({
    userName: zod.string().min(1),
    email: zod.string().min(1).email(),
    password: zod.string().min(3),
    fullName: zod.string().min(1),
});

const registerUser = asyncHandler( async (req, res) => {
    const registerUserInput = req.body;
    const validResponse = registerUserValidation.safeParse(registerUserInput);
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