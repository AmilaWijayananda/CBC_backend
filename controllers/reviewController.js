import Review from "../models/review.js";
import Order from "../models/order.js";
import { isAdmin, isCustomer } from "./userController.js";

export async function createReview(req, res) {
    if (!isCustomer(req)) {
        return res.status(403).json({ message: "Please login as a customer to leave a review." });
    }

    const { email, review, stars } = req.body;

    try {
        const existingOrder = await Order.findOne({ email: email });
        if (!existingOrder) {
            return res.status(403).json({ message: "You must have an order to leave a review." });
        }

        const latestReview = await Review.find().sort({ reviewId: -1 }).limit(1);
        let reviewId;

        if (latestReview.length == 0) {
            reviewId = "REVIEW0001";
        } else {
            const currentReviewId = latestReview[0].reviewId;
            const numberString = currentReviewId.replace("REVIEW", "");
            const number = parseInt(numberString);
            const newNumber = (number + 1).toString().padStart(4, "0");
            reviewId = "REVIEW" + newNumber;
        }

        const newReview = new Review({
            reviewId,
            email,
            review,
            stars,
        });

        await newReview.save();
        res.status(201).json({ message: "Review submitted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export function getReview(req, res) {
    Review.find({}).then((review) => {
      res.json(review);
    });
  }

// export async function getAllReviews(req, res) {
//     if (!isAdmin(req)) {
//         return res.status(403).json({ message: "Access denied. Only admins can view reviews." });
//     }

//     try {
//         const reviews = await Review.find();
//         res.json(reviews);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

export async function updateReviewStatus(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Access denied. Only admins can update review status." });
    }

    const { reviewId, status } = req.body;
    if (!["Visible", "Non-Visible"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value." });
    }

    try {
        const review = await Review.findOneAndUpdate({ reviewId }, { status }, { new: true });
        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }
        res.json({ message: "Review status updated successfully.", review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
