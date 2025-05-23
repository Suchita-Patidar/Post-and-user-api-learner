import { Post } from "../models/post.js";
import { User } from "../models/user.js";

export default {
  fetchPost: async (req, res) => {
    try {
      const posts = await Post.find().populate("user", "name email");
      if (!posts) {
        res.send({ message: "No post found" });
      } else {
        res.status(200).json({ posts });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error " });
    }
  },
  deletePost: async (req, res) => {
    const role = req.user.role;
    if (role != "user") {
      res.json({
        message:
          "Only user can delete a post ,admin are not allowed to delete post",
      });
      return;
    }
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .json({ message: "Post id is required for deleting a post" });
      } else {
        const deletePost = await Post.deleteOne({ _id: id });
        res.send({
          message: "Post deleted successfully",
          deletedPost: deletePost,
        });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createPost: async (req, res) => {
    // console.log(req.body);
    // console.log(req.user);
    const role = req.user.role;
    if (role != "user") {
      res.json({
        message:
          "Only user can create a post ,admin are not allowed to create post",
      });
      return;
    }
    try {
      const userId = req.user.userId;
      const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        user: userId,
      });
      await newPost.save();
      await User.findByIdAndUpdate(userId, {
        $push: {
          user_post: newPost._id,
        },
      });
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (err) {
      res.status(500).json({ message: "Internal server error occured" });
    }
  },
};
