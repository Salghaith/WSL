import express from "express";
import {editUser} from "../controllers/user-cont.js"
import  verifyToken  from "../middleware/jwt.js";
const router = express.Router();

router.put("/update", editUser);

export default router;