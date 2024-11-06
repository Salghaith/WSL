import express from "express";
import  verifyToken  from "../middleware/jwt.js";
import editBusiness, {searchBusinesses, submitReview, getBusinessReviews} from "../controllers/business-cont.js";

const router = express.Router();

router.put("/update",verifyToken, editBusiness);
router.get("/search",searchBusinesses);
router.post("/review",verifyToken, submitReview);
router.get("/:businessId/reviews", getBusinessReviews);

export default router;