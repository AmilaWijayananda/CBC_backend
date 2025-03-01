import express from "express";
import { createReview, getReview, updateReviewStatus } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",createReview)
reviewRouter.get("/", getReview)
reviewRouter.put("/:reviewId",updateReviewStatus)

export default reviewRouter