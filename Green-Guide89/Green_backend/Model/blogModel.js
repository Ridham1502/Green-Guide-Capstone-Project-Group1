const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User",
    },
    summary: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: [String],  
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
