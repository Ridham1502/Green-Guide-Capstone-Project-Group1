const mongoose = require("mongoose");
const { Schema } = mongoose;

const GardenSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    plants: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Plant",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    last_watered: {
      type: Date,
      required: true,
    },
    fertilized_schedule: {
      type: String,
      required: true,
      enum: ["Every 2 weeks", "Every 3 weeks", "Every 4 weeks", "Weekly", "Monthly"],
    },
    growth_notes: {
      type: String,
      default: "",
    },
    growth_images: {
      type: [String],  
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Garden", GardenSchema);
