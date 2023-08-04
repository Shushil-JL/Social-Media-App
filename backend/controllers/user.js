const User = require("../models/User")
const Post = require("../models/Post")
const { sendEmail } = require("../middlewares/sendEmail")
const crypto = require("crypto")

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({
            success: false,
            meessage: "User already exists"

        })
        user = await User.create({
            name, email, password, avatar: {
                public_id: "sampleid",
                url:"https://media.istockphoto.com/id/1419532732/photo/diversity-in-working-team-using-internet-on-phones-and-digital-tablet-for-teamwork-growth-in.webp?b=1&s=612x612&w=0&k=20&c=PWbQL27aT7woHwQT34m2SGG7nZ4cz64UmCoRY7xWMms="
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


        const user = await User.findOne({ email }).select("+password")
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
        console.log(user.password)
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
        const { name, email } = req.body
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "please provide name and email"
            })
        }
        user.name = name
        user.email = email

        // user avatar to do
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


        await user.deleteOne()

        // logout user
        res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })

        // delete all posts of the user
        for (i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i])
            await post.deleteOne()
        }

        // removing users from followers following
        for (i = 0; i < following.length; i++) {
            const follower = await User.findById(following[i])

            const index = follower.followers.indexOf(userId)
            follower.followers.splice(index, 1)
            await follower.save()
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
        const user = await User.findById(req.user._id).populate("posts")


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
        const user = await User.findById(req.params.id).populate("posts")

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
        const users = await User.find({})
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


        const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`
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

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Token is invalid or has expired!"
            })
        }

        user.password = req.body.password
        user.resetPasswordToken= undefined
        user.resetPasswordExpire = undefined
        user.save()

        res.status(200).json({
            success:true,
            message:"Password reset successful"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}