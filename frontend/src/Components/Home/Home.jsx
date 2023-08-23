import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Home.css"
import User from '../User/User'
import Post from '../Post/Post'
import { getAllUsers, getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'

const Home = () => {
    const dispatch = useDispatch()


    const { loading, posts, error } = useSelector((state) => state.postOfFollowing)
    const { loading: userLoading, users } = useSelector((state) => state.allUsers)
    useEffect(() => {
        dispatch(getFollowingPosts())
        dispatch(getAllUsers())

        if (error) {
            dispatch({
                type: "clearErrors"
            })
        }


    }, [dispatch, error])

    return (
        loading ? <Loader /> : <div className="home">
            <div className="homeleft">


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
                    />
                )) : <Typography variant='h6'>No Posts yet</Typography>}
            </div>
            <div className="homeright">
                {userLoading ? <Loader /> : users && users.length > 0 ? (
                    users.map((user) => (
                        <User
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url}

                        />
                    ))
                ) : (<Typography>No users yet</Typography>)}


            </div>
        </div>
    )
}

export default Home