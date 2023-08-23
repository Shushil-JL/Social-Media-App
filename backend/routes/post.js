const express = require("express")
const { createPost,
    likeAndUlikePost,
    deletePost,
    getPostofFollowing,
    updateCaption,
    commentOnPost,
    deleteComment,
    getMyPosts
} = require("../controllers/post")
const { isAuthenticated } = require("../middlewares/auth")

const router = express.Router()

router.route("/post/upload").post(isAuthenticated, createPost)
router.route("/post/:id")
    .get(isAuthenticated, likeAndUlikePost)
    .put(isAuthenticated, updateCaption)
    .delete(isAuthenticated, deletePost)

router.route("/my/posts").get(isAuthenticated, getMyPosts)

router.route("/posts").get(isAuthenticated, getPostofFollowing)
router.route("/post/comment/:id").put(isAuthenticated, commentOnPost).delete(isAuthenticated, deleteComment)

module.exports = router