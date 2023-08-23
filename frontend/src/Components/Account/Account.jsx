import React, { useEffect, useState } from 'react'
import "./Account.css"
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, getMyPosts, logoutUser } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import User from '../User/User'

const Account = () => {
    const dispatch = useDispatch()

    const { user, loading: userLoading } = useSelector(state => state.user)
    const { loading, error, posts } = useSelector(state => state.myPosts)

    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)

    const logoutHandler = async () => {
        await dispatch(logoutUser())
    }
    const deleteProfileHandler = async () => {
        await dispatch(deleteProfile())
        dispatch(logoutUser())
    }

    useEffect(() => {

        dispatch(getMyPosts())
        if (error) {
            dispatch({
                type: "clearErrors"
            })
        }

    }, [dispatch, error])

    return loading === true || userLoading === true ? (<Loader />) : (
        <div className='account'>
            <div className="accountleft">

                {posts && posts.length > 0 ? posts.map((post) => (
                    <Post
                        key={post._id}
                        // postImage={"https://media.istockphoto.com/id/155150763/photo/a-bouquet-of-pink-and-purple-flowers.jpg?s=612x612&w=0&k=20&c=DDb8e0yo6EkibRSFrfkCuBLLzrHU10w4lhNbFMdw0EM="}
                        // ownerName={"shushil"}

                        postId={post._id}
                        caption={post.caption}
                        postImage={post.image.url}
                        likes={post.likes}
                        comments={post.comments}
                        ownerImage={post.owner.avatar.url}
                        ownerName={post.owner.name}
                        ownerId={post.owner}
                        isAccount={true}
                        isDelete={true}
                    />
                )) : <Typography variant='h6'>You have not posted anything</Typography>}


            </div>
            {
                user && <div className="accountright">
                    <Avatar src={user.avatar.url} sx={{
                        height: "8vmax", width: "8vmax"
                    }} />

                    <Typography variant='h5'>{user.name} </Typography>

                    <div>
                        <button onClick={() => setFollowersToggle(!followersToggle)}>
                            <Typography>Followers</Typography>
                        </button>
                        <Typography>{user.followers.length}</Typography>

                    </div>

                    <div>
                        <button onClick={() => setFollowingToggle(!followingToggle)} >
                            <Typography >Following</Typography>
                        </button>
                        <Typography>{user.following.length}</Typography>
                    </div>
                    <div>
                        <Typography>Posts</Typography>
                        <Typography>{user.posts.length}</Typography>

                    </div>

                    <Button variant='contained' onClick={logoutHandler} >Logout</Button>
                    <Link to={"/update/profile"} >Edit Profile</Link>
                    <Link to={"/update/password"} >Change Password</Link>

                    <Button
                        variant='text'
                        style={{ color: "red", margin: "2vmax" }}
                        onClick={deleteProfileHandler}
                    >Delete Profile</Button>

                    <Dialog
                        open={followersToggle}
                        onClose={() => setFollowersToggle(!followersToggle)}
                    >
                        <div className="DialogBox">
                            <Typography variant='h4'>Followers</Typography>
                            {
                                user && user.followers.length > 0 ? user.followers.map((follower) => (
                                    <User
                                        key={follower._id}
                                        userId={follower._id}
                                        name={follower.name}
                                        avatar={follower.avatar.url}
                                    />
                                )) : (
                                    <Typography style={{ margin: "2vmax" }}>You have no followers</Typography>
                                )
                            }
                        </div>
                    </Dialog>

                    <Dialog open={followingToggle} onClose={() => setFollowingToggle(!followingToggle)}>
                        <div className="DialogBox">
                            <Typography variant='h4'>Followers</Typography>
                            {
                                user && user.following.length > 0 ? user.following.map((following) => (
                                    <User
                                        key={following._id}
                                        userId={following._id}
                                        name={following.name}
                                        avatar={following.avatar.url}
                                    />
                                )) : (
                                    <Typography style={{ margin: "2vmax" }}>You are not following anyone</Typography>
                                )
                            }
                        </div>
                    </Dialog>
                </div>
            }
        </div>)


}

export default Account