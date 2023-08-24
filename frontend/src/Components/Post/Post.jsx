import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { Avatar, Button, Typography, Dialog } from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline
} from '@mui/icons-material'
import { Link } from "react-router-dom";
import "./Post.css";
import { UpdateMypost, addCommentonPost, deleteMypost, likePost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";


const Post = (
  { postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false }
) => {

  
  const [liked, setLiked] = useState(false)
  const [likesToggle, setLikeToggle] = useState(false)
  const [commentToggle, setCommentToggle] = useState(false)
  const [commentValue, setCommentValue] = useState("")
  const [captionValue, setCaptionValue] = useState(caption)
  const [captionToggle, setCaptionToggle] = useState(false)


  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  const handleLike = async () => {
    setLiked(!liked)
    await dispatch(likePost(postId))

    if (isAccount) {
      // console.log("bring my posts")
      dispatch(getMyPosts())


    }
    else {

      dispatch(getFollowingPosts())
    }

  }
  const addCommentHandler = async (e) => {
    e.preventDefault()
    await dispatch(addCommentonPost(postId, commentValue))

    if (isAccount) {
      // console.log("getmyposts")
      dispatch(getMyPosts())
    } else {

      dispatch(getFollowingPosts())
    }
  }

  const deletePostHandler = async () => {

    await dispatch(deleteMypost(postId))
    await dispatch(loadUser())
    dispatch(getMyPosts())

    // console.log("deletePost clicked")
  }

  const updateCaptionHandler = async () => {
    await dispatch(UpdateMypost(postId, captionValue))
    dispatch(getMyPosts())
  }

  useEffect(() => {
    likes && likes.forEach((item) => {
      // console.log(item)
      if (item._id === user._id)
        setLiked(true)
    })

  }, [likes, user._id])


  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? <Button onClick={() => setCaptionToggle(!captionToggle)}> <MoreVert /></Button> : null}

      </div>
      <img src={postImage} alt="post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            widht: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
          key={caption}
        >{caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax"
        }}
        onClick={() => setLikeToggle(!likesToggle)}
        disabled={likes.length === 0}
      >
        <Typography>{likes.length} likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button onClick={() => setCommentToggle(!commentToggle)} >
          <ChatBubbleOutline />
        </Button>
        {
          isDelete ? (<Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>) : null
        }
      </div>
      <Dialog open={likesToggle} onClose={() => setLikeToggle(!likesToggle)} >

        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {
            likes && likes.map((like) => (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}

              />
            ))
          }
        </div>
      </Dialog>
      {/* comment segment goes here */}

      <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)} >

        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>
          <form className="commnentForm" onSubmit={addCommentHandler} >
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="comment here"
              required
            />
            <Button type="submit" variant="contained">Add</Button>
          </form>
          {
            comments.length > 0 ? comments.map((item) => (
              <CommentCard
                key={item._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            )) : <Typography>No Comments Yet</Typography>
          }
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>
          <form className="commnentForm" onSubmit={updateCaptionHandler} >
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="new Caption"
              required
            />
            <Button type="submit" variant="contained">Update</Button>
          </form>
        </div>
      </Dialog>


    </div>
  );
};

export default Post;