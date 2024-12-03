const express = require("express");
const router = express.Router();
const gardenController = require("../Controller/gardenController");
const auth = require("../Middleware/auth");

router.post("/garden", auth, gardenController.createGarden);
router.get("/garden/list", gardenController.getAllGardens);
router.get("/gardens/:id", gardenController.getGardenById);
router.put("/:id", gardenController.updateGarden);
router.delete("/garden/:id", gardenController.deleteGarden);

module.exports = router;
