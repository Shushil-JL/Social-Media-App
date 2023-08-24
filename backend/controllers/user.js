const User = require("../models/User")
const Post = require("../models/Post")
const { sendEmail } = require("../middlewares/sendEmail")
const crypto = require("crypto")
const cloudinary = require('cloudinary')

exports.register = async (req, res) => {
    try {

        const { avatar, name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({
            success: false,
            meessage: "User already exists"

        })
        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "Avatars"
        })

        user = await User.create({
            name: `@${name}`, email, password, avatar: {
                public_id: myCloud.public_id,
                // url: "https://media.istockphoto.com/id/1419532732/photo/diversity-in-working-team-using-internet-on-phones-and-digital-tablet-for-teamwork-growth-in.webp?b=1&s=612x612&w=0&k=20&c=PWbQL27aT7woHwQT34m2SGG7nZ4cz64UmCoRY7xWMms="
                url: myCloud.secure_url
            }
        })
        const token = await user.generateToken()

        res.status(201).cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).json({
            success: true,
            user,
            token,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body


        const user = await User.findOne({ email }).select("+password").populate("posts followers following")
        if (!user) {
            return res.status(400).json({
                success: false,
                messsage: "User doesnot exist"
            })
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }


        const token = await user.generateToken()

        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).json({
            success: true,
            user,
            token,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.logout = (req, res) => {
    try {
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true }).json({
            success: true,
            message: "Logged Out"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password")
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) return res.status(400).json({
            success: false,
            message: "Please provide old and new password"
        })
        if (oldPassword === newPassword) return res.status(400).json({
            success: false,
            message: "Your new password should be other than Old password"
        })
        const isMatch = await user.matchPassword(oldPassword)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect old password"
            })
        }
        user.password = newPassword
        await user.save()

        res.status(200).json({
            success: true,
            message: "Password Updated"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}


exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const { avatar, name, email } = req.body
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "please provide name and email"
            })
        }
        if (name) {

            user.name = `@${name}`
        }
        if (email) {

            user.email = email
        }
        if (avatar) {
            await cloudinary.v2.uploader.destroy(post.avatar.public_id)

            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: "Avatars"
            })

            user.avatar.public_id = myCloud.public_id
            // url="https://media.istockphoto.com/id/1419532732/photo/diversity-in-working-team-using-internet-on-phones-and-digital-tablet-for-teamwork-growth-in.webp?b=1&s=612x612&w=0&k=20&c=PWbQL27aT7woHwQT34m2SGG7nZ4cz64UmCoRY7xWMms="
            user.avatar.url = myCloud.secure_url


        }
        await user.save()

        res.status(200).json({
            success: true,
            message: "Profile Updated"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

exports.deleteMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const posts = user.posts
        const following = user.following
        const userId = user._id

        await cloudinary.v2.uploader.destroy(user.avatar.public_id) //deletes image from cloud

        await user.deleteOne()  //delete from database


        // logout user
        res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })

        // delete all posts of the user
        for (i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i])
            await cloudinary.v2.uploader.destroy(post.image.public_id)

            await post.deleteOne()
        }

        // removing users from followers following
        for (i = 0; i < following.length; i++) {
            const follower = await User.findById(following[i])

            const index = follower.followers.indexOf(userId)
            follower.followers.splice(index, 1)
            await follower.save()
        }

        // delete all likes and comments to do
        const allPost = await Post.find()

        for (let i = 0; i < allPost.length; i++) {
            const post = await Post.findById(allPost[i]._id)
            // to delete user comments
            for (let j = 0; j < post.comments.length; j++) {
                if (post.comments[j].user === userId) {
                    post.comments.splice(j, 1)
                }
            }
            // to delete user likes
            for (let j = 0; j < post.likes.length; j++) {
                if (post.likes[j].user === userId) {
                    post.likes.splice(j, 1)
                }
            }

        }
        res.status(200).json({
            success: true,
            message: "Profile deleted"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("posts followers following")


        res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts followers following")

        if (!user) {
            return res.stast(404).json({
                success: false,
                message: "User doesnot exist"
            })
        }

        res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ name: { $regex: req.query.name, $options: 'i' } })
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "No users Found"
            })
        }

        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

exports.forgetPassword = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        const resetPasswordToken = await user.getResetPasswordToken()
        await user.save()


        const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`
        const message = `Click the link bellow to reset your password:\n\n${resetUrl}`

        try {
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            })

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`
            })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save()
            error.meessage
            res.status(500).json({
                success: false,
                message: error.message
            })

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.resetPassword = async (req, res) => {
    try {
        // hash the reset token 
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

        // find the user with the hash token 
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or has expired!"
            })
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}