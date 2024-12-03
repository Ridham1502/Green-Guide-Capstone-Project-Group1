const express = require("express");
const router = express.Router();
const blogController = require("../Controller/blogController");
const { upload } = require("../utils/multer2");
const auth = require("../Middleware/auth");

router.post(
  "/blogs",
  auth,
  upload.single("imageUrl"),
  blogController.createBlog
);
router.get("/blogs/list", blogController.getBlogs);
router.get("/blogs/:id", blogController.getBlogById);
router.post("/blogs/:id", auth, blogController.getBlogById);
router.put(
  "/blogs/:id",
  auth,
  upload.single("imageUrl"),
  blogController.updateBlog
);
router.delete("/blogs/:id", auth, blogController.deleteBlog);

module.exports = router;
