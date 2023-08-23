import React from 'react'
import "./CommentCard.css"
import { Link } from 'react-router-dom'
import { Avatar, Button, Typography } from '@mui/material'
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentonPost } from '../../Actions/Post';
import { getFollowingPosts } from '../../Actions/User';

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount,
}) => {

    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const deleteCommentHandler = async () => {
        console.log(postId, commentId)
        await dispatch(deleteCommentonPost(postId, commentId))

        if (isAccount) {
            console.log("bring my post")
        } else {
            dispatch(getFollowingPosts())
        }
    }

    return (
        <div className='commentUser'>
            <Link to={`/user/${userId}`}>
                {/* <img src={avatar} alt={name} /> */}
                <Avatar
                    src={avatar}
                    alt="User"
                    sx={{
                        height: "2vmax",
                        widht: "1vmax",
                    }} />
                <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>

            </Link>
            <Typography>
                {comment}
            </Typography>
            {
                isAccount ? (<Button
                    onClick={deleteCommentHandler}
                ><Delete /></Button>) : userId === user._id ? (<Button
                    onClick={deleteCommentHandler}
                ><Delete /></Button>) : null
            }

        </div>
    )
}

export default CommentCard