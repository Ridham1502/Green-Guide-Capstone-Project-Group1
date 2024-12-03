const Garden = require('../Model/gardenModel'); 
const { upload } = require('../utils/mutler1');

module.exports.createGarden = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: "Error uploading images", error: err.message });
        }
        try {
            const growthImageUrls = req.files.growth_images ? req.files.growth_images.map(file => file.path) : [];

            const newGarden = new Garden({
                ...req.body,
                growth_images: growthImageUrls,
                growth_notes: req.body.growth_notes || "", 
                user: req.user._id,
            });

            await newGarden.save();
            res.status(201).json({ message: "Garden created successfully", garden: newGarden });
        } catch (error) {
            res.status(400).json({ message: "Error creating garden", error: error.message });
        }
    });
};

module.exports.getAllGardens = async (req, res) => {
    try {
        const gardens = await Garden.find().populate('user'); 
        res.status(200).json(gardens);
    } catch (error) {
        res.status(500).json({ message: "Error fetching gardens", error: error.message });
    }
};

module.exports.getGardenById = async (req, res) => {
    try {
        const garden = await Garden.findById(req.params.id).populate('plants user');
        if (!garden) {
            return res.status(404).json({ message: "Garden not found" });
        }
        res.status(200).json(garden);
    } catch (error) {
        res.status(500).json({ message: "Error fetching garden", error: error.message });
    }
};

module.exports.updateGarden = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: "Error uploading images", error: err.message });
        }
        try {
            const updates = { ...req.body };

            // If new images are provided, update growth_images or general images accordingly
            if (req.files) {
                const growthImageUrls = req.files.map(file => file.path);
                if (growthImageUrls.length > 0) {
                    updates.growth_images = growthImageUrls;
                }
            }

            const updatedGarden = await Garden.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            );

            if (!updatedGarden) {
                return res.status(404).json({ message: "Garden not found" });
            }

            res.status(200).json({ message: "Garden updated successfully", garden: updatedGarden });
        } catch (error) {
            res.status(400).json({ message: "Error updating garden", error: error.message });
        }
    });
};

module.exports.deleteGarden = async (req, res) => {
    try {
        const deletedGarden = await Garden.findByIdAndDelete(req.params.id);
        if (!deletedGarden) {
            return res.status(404).json({ message: "Garden not found" });
        }
        res.status(200).json({ message: "Garden deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting garden", error: error.message });
    }
};
