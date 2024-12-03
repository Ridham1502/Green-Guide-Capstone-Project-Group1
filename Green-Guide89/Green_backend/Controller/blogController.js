const Blog = require("../Model/blogModel");

module.exports.createBlog = async (req, res) => {
  try {
    const { title, summary } = req.body;
    const userId = req.user._id;
    const imageUrl = req.file ? req.file.path : null;  

    const newBlog = new Blog({
      user: userId,
      title,
      summary,
      imageUrl: imageUrl ? [imageUrl] : [],
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

module.exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate('user');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blogs", error });
  }
};

module.exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blog", error });
  }
};

module.exports.updateBlog = async (req, res) => {
  try {
    const { title, summary } = req.body;
    const userId = req.user._id;

    const imageUrl = req.file ? req.file.path : undefined;
    const updateData = { title, summary };
    if (imageUrl) updateData.imageUrl = [imageUrl];

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found or you do not have permission to update this blog" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found or you do not have permission to delete this blog" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
