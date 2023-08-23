import { configureStore } from '@reduxjs/toolkit'
import { getAllUserReducer, postOfFollowingReducer, userProfileReducer, userReducer } from './Reducers/User';
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: getAllUserReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostsReducer,
    }
})

export default store;