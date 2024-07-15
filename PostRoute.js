const router = require("express").Router();
const Post = require("./PostModel");
const User = require("./UserModel");


router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("Failed to Upload Post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("Failed to Delete the post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.username } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.username } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put("/:id/comment", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.comments.includes(req.body.username)) {
        await post.updateOne({ $push: { comments: req.body.username } });
        res.status(200).json("comment Uploaded");
      } else {
        await post.updateOne({ $pull: { comments: req.body.username } });
        res.status(200).json("Failed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;  