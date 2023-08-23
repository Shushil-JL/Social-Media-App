const express = require("express")
const { register,
    login,
    logout,
    updatePassword,
    updateProfile,
    deleteMyProfile,
    myProfile,
    getUserProfile,
    getAllUsers,
    forgetPassword,
    resetPassword,
} = require("../controllers/user")


const { followUser, getUserPosts } = require("../controllers/post")
const { isAuthenticated } = require("../middlewares/auth")

const router = express.Router()

router.route("/login").post(login)
router.route("/logout").get(isAuthenticated, logout)
router.route("/register").post(register)

router.route("/follow/:id").get(isAuthenticated, followUser)


router.route("/update/profile").put(isAuthenticated, updateProfile)
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile)
router.route("/me").get(isAuthenticated, myProfile)
router.route("/user/:id").get(isAuthenticated, getUserProfile)

router.route("/userposts/:id").get(isAuthenticated, getUserPosts)
router.route("/users").get(isAuthenticated, getAllUsers)

router.route("/update/password").put(isAuthenticated, updatePassword)
router.route("/password/forget").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)
module.exports = router