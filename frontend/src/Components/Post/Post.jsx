import React, { useState } from "react";
import { useDispatch } from "react-redux"

import { Avatar, Button, Typography } from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline
} from '@mui/icons-material'
import { Link } from "react-router-dom";
import "./Post.css";
import { likePost } from "../../Actions/Post";
import { getFollowingPosts } from "../../Actions/likes.length} likes</Typography>
</button>

<div className="";

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

  const dispatch = useDispatch()
  const handleLike = () => {
    setLiked(!liked)

    dispatch(likePost(postId))
    dispatch(getFollowingPosts())
  }
  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? <Button> <MoreVert /></Button> : null}

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
      >
        <Typography>{likes.length} likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button>
          <ChatBubbleOutline />
        </Button>
        {
          isDelete ? (<Button>
            <DeleteOutline />
          </Button>) : null
        }
      </div>
    </div>
  );
};

export default Post;
