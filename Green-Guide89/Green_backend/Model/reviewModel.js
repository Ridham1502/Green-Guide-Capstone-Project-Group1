const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    user : {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User",
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
