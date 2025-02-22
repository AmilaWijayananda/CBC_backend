import express from "express";
import { createReview, getAllReviews, updateReviewStatus } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",createReview)
reviewRouter.get("/", getAllReviews)
reviewRouter.put("/:reviewId",updateReviewStatus)

export default reviewRouter