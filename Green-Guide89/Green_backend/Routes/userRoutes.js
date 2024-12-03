const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/users/:id", userController.fetchUserById);

module.exports = router;
