import express from "express";
import verifyToken from "../middleware/jwt.js";
import editBusiness, {
  searchBusinesses,
  submitReview,
  getBusinessReviews,
  sendEmail,
} from "../controllers/business-cont.js";

const router = express.Router();

router.put("/update", verifyToken, editBusiness);
router.get("/search", searchBusinesses);
router.post("/review", verifyToken, submitReview);
router.get("/:businessId/reviews", getBusinessReviews);
router.post("/mail", sendEmail);

export default router;
