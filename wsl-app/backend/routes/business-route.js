import express from "express";
import  verifyToken  from "../middleware/jwt.js";
import editBusiness, {searchBusinesses} from "../controllers/business-cont.js";

const router = express.Router();

router.put("/update",verifyToken, editBusiness);
router.get("/search",searchBusinesses);

export default router;