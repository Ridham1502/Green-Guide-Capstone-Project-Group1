const express = require("express");
const { createReview , getAllReviews} = require("../Controller/reviewController");
const auth = require("../Middleware/auth"); 

const router = express.Router();

router.post("/reviews", auth, createReview);
router.get("/reviews/list", getAllReviews);

module.exports = router;
