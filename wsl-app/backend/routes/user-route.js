import express from "express";
import { editUser, resetPassword } from "../controllers/user-cont.js";
import verifyToken from "../middleware/jwt.js";
const router = express.Router();

router.put("/update", verifyToken, editUser);

router.put("/reset", resetPassword);

export default router;
