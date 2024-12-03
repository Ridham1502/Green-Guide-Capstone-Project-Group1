// routes/postCommentRoutes.js
const express = require("express");
const controller = require("../Controller/postController");
const authMiddleware = require("../Middleware/auth");
const router = express.Router();
const { upload } = require("../utils/multer2");

router.post("/post/create", authMiddleware, upload.single('image'), controller.createPost);
router.get("/post/all", controller.getAllPosts);
router.get("/post/:id", controller.getPostById);
router.post("/post/:id/comments", authMiddleware, controller.addComment);
router.get("/post/:id/fetch/comments", controller.getAllCommentsByPostId);
router.delete("/comments/:commentId", authMiddleware, controller.deleteComment);

module.exports = router;
