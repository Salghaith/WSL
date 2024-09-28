import express from "express";
import { registerBusiness,registerUser, login, logout} from "../controllers/auth-cont.js";
const router = express.Router();


router.post("/registerbusiness", registerBusiness);
router.post("/register",registerUser);
router.post("/login", login);
router.post("/logout",logout);

export default router;