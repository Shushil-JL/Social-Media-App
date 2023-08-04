import axios from 'axios'

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginRequest"
        })

        const { data } = await axios.post(
            "/api/v1/login",
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        dispatch({
            type: "loginSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "loginFailure",
            payload: error.response.data.message
        })

    }
}


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "loadUserRequest"
        })

        const { data } = await axios.get("/api/v1/me")
        dispatch({
            type: "loadUserSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "loadUserFailure",
            payload: error.response.data.message
        })

    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest"
        })

        const { data } = await axios.get("/api/v1/logout")
        dispatch({
            type: "logoutSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "logoutFailure",
            payload: error.response.data.message
        })

    }
}
export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "registerRequest"
        })

        const { data } = await axios.get("/api/v1/register",
            { name, email, password },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        dispatch({
            type: "registerSuccess",
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: "registerFailure",
            payload: error.response.data.message
        })

    }
}

export const getFollowingPosts = ()=>async(dispatch)=>{
    try {
        dispatch({
            type: "postOfFollowingRequest"
        })

        const { data } = await axios.get("/api/v1/posts")
        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts
        })
        
    } catch (error) {
        dispatch({
            type: "postOfFollowingFailure",
            payload: error.response.data.message
        })
        
    }
}

export const getAllUsers =()=>async(dispatch)=>{
    try {
        
        dispatch({
            type: "getAllUserRequest"
        })

        const { data } = await axios.get("/api/v1/users")
        dispatch({
            type: "getAllUserSuccess",
            payload: data.users
        })
        
    } catch (error) {
        dispatch({
            type: "getAllUserFailure",
            payload: error.response.data.message
        })
        
    }
}