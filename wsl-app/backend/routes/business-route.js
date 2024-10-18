import express from "express";
import  verifyToken  from "../middleware/jwt.js";
import editBusiness from "../controllers/business-cont.js";

const router = express.Router();

router.put("/update",verifyToken, editBusiness);

export default router;