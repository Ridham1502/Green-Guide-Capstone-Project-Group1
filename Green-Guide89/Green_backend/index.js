const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

const UserRoutes = require("./Routes/userRoutes");
const PlantRoutes = require("./Routes/plantRoutes");
const GardenRoutes = require("./Routes/gardenRoutes");
const blogRoutes = require("./Routes/blogRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const contactUsRoutes = require("./Routes/contactUsRoutes");
const postRoutes = require("./Routes/postRoutes");

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use("/auth", UserRoutes);
app.use("/api", PlantRoutes, GardenRoutes, blogRoutes, reviewRoutes , contactUsRoutes , postRoutes);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
