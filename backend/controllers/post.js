const Post = require("../models/Post")
const User = require("../models/User")

exports.createPost = async (req, res) => {
    try {
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: req.body.public_id,
                url: "https://media.istockphoto.com/id/155150763/photo/a-bouquet-of-pink-and-purple-flowers.jpg?s=612x612&w=0&k=20&c=DDb8e0yo6EkibRSFrfkCuBLLzrHU10w4lhNbFMdw0EM=",
            },
            owner: req.user._id,

        }
        const newPost = await Post.create(newPostData)
        const user = await User.findById(req.user._id)

        user.posts.push(newPost._id)

        await user.save()

        res.status(201).json({
            success: true,
            newPost
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })

        if (post.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })

        }

        await post.deleteOne()
        const user = await User.findById(req.user._id)
        const index = user.posts.indexOf(req.params.id)
        user.posts.splice(index, 1)
        await user.save()
        res.status(200).json({
            success: true,
            message: "Post deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.likeAndUlikePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })

        if (post.likes.includes(req.user._id)) {

            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index, 1)
            post.save()
            return res.status(200).json({
                success: true,
                message: "Post unliked"
            })
        }
        else {

            post.likes.push(req.user._id)
            await post.save()
            return res.status(200).json({
                success: true,
                message: "Post liked"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.followUser = async (req, res) => {
    try {

        const userToFollow = await User.findById(req.params.id)
        const loggedInUser = await User.findById(req.user._id)
        if (!userToFollow) return res.status(404).json({
            success: false,
            message: "User not found"
        })



        if (loggedInUser.following.includes(userToFollow._id)) {

            let index = loggedInUser.following.indexOf(userToFollow._id)
            loggedInUser.following.splice(index, 1)
            await loggedInUser.save()

            index = userToFollow.followers.indexOf(loggedInUser._id)
            userToFollow.followers.splice(index, 1)
            await userToFollow.save()

            return res.status(200).json({
                success: true,
                message: "User unfollwed"
            })
        }
        else {


            loggedInUser.following.push(userToFollow._id)
            userToFollow.followers.push(loggedInUser._id)
            await loggedInUser.save()
            await userToFollow.save()
            res.status(200).json({
                success: true,
                message: "User followed"
            })
        }





    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}


exports.getPostofFollowing = async (req, res) => {
    try {
        // const user = await User.findById(req.user._id).populate("following","posts")
        const user = await User.findById(req.user._id)

        const posts = await Post.find({
            owner: {
                $in: user.following
            }
        }).populate("owner likes comments.user")

        res.status(200).json({
            success: true,
            posts:posts.reverse()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.updateCaption = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })
        if (post.owner.toString() !== req.user._id.toString()) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })

        post.caption = req.body.caption
        await post.save()
        res.status(200).json({
            success: true,
            message: "Caption Updated"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })

    }
}

exports.commentOnPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) return res.status(404).json({
            success: false,
            message: "Post not found"
        })

        let commentIndex = -1

        // checking if comment already exist
        post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) {
                commentIndex = index
            }

        })

        // the issue is same user is unable to make multiple comment

        if (commentIndex !== -1) {

            post.comments[commentIndex].comment = req.body.comment
            await post.save()

            return res.status(200).json({
                success: true,
                message: "Comment updated"
            })

        } else {

            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })
            await post.save()
            return res.status(200).json({
                success: true,
                message: "Comment added"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.deleteComment = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }
        

        if (post.owner.toString()===req.user._id.toString()) {
            if(req.body.commentId===undefined){
                return res.status(400).json({
                    success:false,
                    message:"Comment id is required"
                })
            }

            post.comments.forEach((item, index) => {
                if (item._id.toString() === req.body.commentId.toString()) {
                    return post.comments.splice(index,1)
                }
    
            })
            await post.save()
            res.status(200).json({
                success:true,
                message:"Comment deleted",
            })

            
        } else {

            post.comments.forEach((item, index) => {
                if (item.user.toString() === req.user._id.toString()) {
                    return post.comments.splice(index,1)
                }
    
            })
            
            await post.save()
            res.status(200).json({
                success:true,
                message:"Comment deleted",
            })
        }

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

        
    }
}