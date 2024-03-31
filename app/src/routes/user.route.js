import {Router} from "express";
import {loginUser, logoutUser, registerUser, changePassword} from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/forgetpassword").post(changePassword);

export default router;