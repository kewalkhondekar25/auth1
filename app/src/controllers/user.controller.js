import asyncHandler from "../utils/asyncHandler.js";
import zod from "zod";

const registerValidation = zod.object({
    userName: zod.string().min(1),
    email: zod.string().min(1).email(),
    password: zod.string().min(3),
    fullName: zod.string().min(1),
})

const registerUser = asyncHandler( async (req, res) => {
    const registerUserInput = req.body;
    const response = registerValidation.safeParse(registerUserInput);
    if(!response.success){
        res.status(400).json({
            message: response.error
        })
    }else{
        res.status(200).json({
            response
        })
    }
});

export default registerUser