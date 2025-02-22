import express from "express";
import { createReview, getAllReviews, updateReviewStatus } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",createReview)
orderRouter.get("/", getAllReviews)
orderRouter.put("/:reviewId",updateReviewStatus)

export default reviewRouter