const { Post, Comment } = require("../Model/postModel");

module.exports.createPost = async (req, res) => {
  try {
    const { title, summary } = req.body;
    const userId = req.user.id;

    const image = req.file ? req.file.path : null;

    const post = new Post({
      title,
      summary,
      image,
      user: userId,
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    .populate("user", "name email") 
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name email" 
      }
    })
    .exec();  

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

module.exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("user", "name email")
      .populate("comments")
      .exec();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

module.exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      content,
      user: userId,
      post: postId,
    });

    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const post = await Post.findById(comment.post);
    post.comments = post.comments.filter((c) => c.toString() !== commentId);
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

module.exports.getAllCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name email",
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching comments", error: error.message });
  }
};
