import {configureStore} from '@reduxjs/toolkit'
import { getAllUserReducer, postOfFollowingReducer, userReducer } from './Reducers/User';
import { likeReducer } from './Reducers/Post';

const store = configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducer,
        allUsers:getAllUserReducer,
        like:likeReducer
    }
})

export default store;