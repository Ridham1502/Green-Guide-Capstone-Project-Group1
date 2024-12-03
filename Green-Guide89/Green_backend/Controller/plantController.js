const Plant = require("../Model/plantsModel");
const { upload } = require("../utils/multer");
const axios = require("axios");

module.exports.createPlant = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading images", error: err.message });
    }

    try {
      const {
        generalInfo = {},
        quickInfo = {},
        detailedInfo = {},
        plantingTimes = {},
      } = req.body;

      const filePaths = {
        icon: req.files.icon
          ? req.files.icon[0].path 
          : generalInfo.icon || null, 
        img: req.files.img
          ? req.files.img[0].path 
          : generalInfo.img || null, 
      };

      const newPlant = new Plant({
        generalInfo: {
          ...generalInfo,
          icon: filePaths.icon,
          img: filePaths.img,
        },
        quickInfo,
        detailedInfo,
        plantingTimes,
      });

      await newPlant.save();
      res
        .status(201)
        .json({ message: "Plant created successfully", plant: newPlant });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error creating plant", error: error.message });
    }
  });
};

module.exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plants", error: error.message });
  }
};

module.exports.getAllTreflePlants = async (req, res) => {
  try {
    const response = await axios.get(
      "https://trefle.io/api/v1/plants?token=IPwk8p-T0NW1olg1PWKYlQBSASb6DhbVHywp7QKpGz0"
    );
    res.status(200).json(response.data.data);
  } catch (error) {
    console.error("Error fetching plants from Trefle API:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching plants", error: error.message });
  }
};

module.exports.getPlantById = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await Plant.findById(id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json(plant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching plant", error: error.message });
  }
};

module.exports.updatePlant = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res
        .status(400)
        .json({ message: "Error uploading images", error: err.message });
    }

    try {
      const { id } = req.params;

      // Find the existing plant
      const existingPlant = await Plant.findById(id);
      if (!existingPlant) {
        return res.status(404).json({ message: "Plant not found" });
      }

      // Extract incoming data and files
      const {
        generalInfo = {},
        quickInfo = {},
        detailedInfo = {},
        plantingTimes = {},
      } = req.body;

      const filePaths = {
        icon: req.files.icon
          ? req.files.icon[0].path // Use new icon path if uploaded
          : generalInfo.icon || existingPlant.generalInfo.icon, // Fallback to existing icon
        img: req.files.img
          ? req.files.img[0].path // Use new img path if uploaded
          : generalInfo.img || existingPlant.generalInfo.img, // Fallback to existing img
      };

      // Prepare updated plant data
      const updatedData = {
        generalInfo: {
          ...existingPlant.generalInfo, // Preserve existing data
          ...generalInfo, // Update with new general info
          icon: filePaths.icon, // Update icon
          img: filePaths.img, // Update img
        },
        quickInfo: {
          ...existingPlant.quickInfo, // Preserve existing data
          ...quickInfo, // Update with new quick info
        },
        detailedInfo: {
          ...existingPlant.detailedInfo, // Preserve existing data
          ...detailedInfo, // Update with new detailed info
        },
        plantingTimes: {
          ...existingPlant.plantingTimes, // Preserve existing data
          ...plantingTimes, // Update with new planting times
        },
      };

      // Update the plant in the database
      const updatedPlant = await Plant.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
      });

      res.status(200).json({
        message: "Plant updated successfully",
        plant: updatedPlant,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error updating plant", error: error.message });
    }
  });
};

module.exports.deletePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await Plant.findByIdAndDelete(id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting plant", error: error.message });
  }
};

module.exports.searchPlantsByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const regex = new RegExp(`^${category}`, 'i'); 

    const plants = await Plant.find({ 'generalInfo.category': regex });

    if (plants.length === 0) {
      return res.status(404).json({ message: "No plants found for this category" });
    }

    return res.status(200).json(plants);
  } catch (error) {
    console.error("Error fetching plants by category:", error);
    return res.status(500).json({ message: "An error occurred while searching for plants" });
  }
};