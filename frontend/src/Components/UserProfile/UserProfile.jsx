import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, getUserPosts, getUserProfile, loadUser, } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import User from '../User/User'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
    const dispatch = useDispatch()

    const { user: me, loading: userLoading } = useSelector(state => state.user)
    const { user } = useSelector((state) => state.userProfile)
    const { loading, error, posts } = useSelector(state => state.userPosts)

    const [followersToggle, setFollowersToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [following, setFollowing] = useState(false)
    const [myProfile, setMyProfile] = useState(false)

    const params = useParams()
    const followHandler = async () => {
        setFollowing(!following)

        await dispatch(followUser(params.id))
        await dispatch(getUserProfile(params.id))
        dispatch(loadUser())
    }


    useEffect(() => {
        dispatch(getUserProfile(params.id))
        dispatch(getUserPosts(params.id))
        if (me._id === params.id) {
            setMyProfile(true)
        }


    }, [dispatch, error, params.id, me._id])

    return loading === true || userLoading === true ? (<Loader />) : (
        <div className='account'>
            <div className="accountleft">

                {posts && posts.length > 0 ? posts.map((post) => (
                    <Post key={post._id}
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
                )) : <Typography variant='h6'>No Post to Show</Typography>}


            </div>
            <div className="accountright">
                <Avatar src={user && user.avatar.url} sx={{
                    height: "8vmax", width: "8vmax"
                }} />

                <Typography variant='h5'>{user && user.name} </Typography>

                <div>
                    <button onClick={() => setFollowersToggle(!followersToggle)}>
                        <Typography>Followers</Typography>
                    </button>
                    <Typography>{user && user.followers.length}</Typography>

                </div>

                <div>
                    <button onClick={() => setFollowingToggle(!followingToggle)} >
                        <Typography >Following</Typography>
                    </button>
                    <Typography>{user && user.following.length}</Typography>
                </div>
                <div>
                    <Typography>Posts</Typography>
                    <Typography>{user && user.posts.length}</Typography>

                </div>

                {
                    myProfile ? null : <Button variant='contained' style={{ background: following ? "red" : "" }} onClick={followHandler} >{
                        following ? "Unfollow" : "Follow"
                    }</Button>

                }
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
        </div>)


}

export default UserProfile