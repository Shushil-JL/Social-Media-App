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

export const updateProfile = (avatar, name, email) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProfileRequest"
        })

        const { data } = await axios.put(
            "/api/v1/update/profile",
            { avatar, name, email },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        dispatch({
            type: "updateProfileSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "updateProfileFailure",
            payload: error.response.data.message
        })

    }
}

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "updatePasswordRequest"
        })

        const { data } = await axios.put(
            "/api/v1/update/password",
            { oldPassword, newPassword },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        dispatch({
            type: "updatePasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "updatePasswordFailure",
            payload: error.response.data.message
        })

    }
}
export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: "forgetPasswordRequest"
        })

        const { data } = await axios.post(
            "/api/v1/password/forget",
            { email },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        dispatch({
            type: "forgetPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "forgetPasswordFailure",
            payload: error.response.data.message
        })

    }
}
export const resetPassword = (token, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "resetPasswordRequest"
        })

        const { data } = await axios.put(
            `/api/v1/password/reset/:${token}`,
            { newPassword },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        dispatch({
            type: "resetPasswordSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "resetPasswordFailure",
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

        await axios.get("/api/v1/logout")
        dispatch({
            type: "logoutSuccess",
        })
    } catch (error) {
        dispatch({
            type: "logoutFailure",
            payload: error.response.data.message
        })

    }
}
export const deleteProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProfileRequest"
        })

        const { data } = await axios.delete(
            "/api/v1/delete/me",

        )
        dispatch({
            type: "deleteProfileSuccess",
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "deleteProfileFailure",
            payload: error.response.data.message
        })

    }
}
export const registerUser = (avatar, name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "registerRequest"
        })

        const { data } = await axios.post("/api/v1/register",
            { avatar, name, email, password },
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

export const getFollowingPosts = () => async (dispatch) => {
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
export const getMyPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: "myPostsRequest"
        })

        const { data } = await axios.get("/api/v1/my/posts")
        dispatch({
            type: "myPostsSuccess",
            payload: data.posts
        })

    } catch (error) {
        dispatch({
            type: "myPostsFailure",
            payload: error.response.data.message
        })

    }
}

export const getAllUsers = () => async (dispatch) => {
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
export const getUserProfile = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "getUserProfileRequest"
        })

        const { data } = await axios.get(`/api/v1/user/${id}`)
        dispatch({
            type: "getUserProfileSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "getUserProfileFailure",
            payload: error.response.data.message
        })

    }
}
export const getUserPosts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "userPostsRequest"
        })

        const { data } = await axios.get(`/api/v1/userposts/${id}`)
        dispatch({
            type: "userPostsSuccess",
            payload: data.posts
        })

    } catch (error) {
        dispatch({
            type: "userPostsFailure",
            payload: error.response.data.message
        })

    }
}
export const followUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "followUserRequest"
        })

        const { data } = await axios.get(`/api/v1/follow/${id}`)
        dispatch({
            type: "followUserSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "followUserFailure",
            payload: error.response.data.message
        })

    }
}