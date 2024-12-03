const Review = require("../Model/reviewModel");

module.exports.createReview = async (req, res) => {
  try {
    const { review } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    const newReview = new Review({
      user: req.user._id,
      review,
    });

    await newReview.save();

    res.status(201).json({
      status: true,
      review: newReview,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating review", error: error.message });
  }
};

module.exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name -_id");
    res.status(201).json({
      status: true,
      review: reviews,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating review", error: error.message });
  }
};
