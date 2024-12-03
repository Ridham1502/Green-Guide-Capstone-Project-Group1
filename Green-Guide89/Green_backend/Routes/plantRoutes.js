const express = require("express");
const plantController = require("../Controller/plantController");
const router = express.Router();

router.post("/plants", plantController.createPlant);
router.get("/plants/list", plantController.getAllPlants);
router.get("/trefle/list", plantController.getAllTreflePlants);
router.get("/plants/:id", plantController.getPlantById);
router.put("/plants/update/:id", plantController.updatePlant);
router.delete("/plants/:id", plantController.deletePlant);
router.post("/plants/search", plantController.searchPlantsByCategory);

module.exports = router;
