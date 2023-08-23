import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false
}
export const userReducer = createReducer(initialState, {
    registerRequest: (state) => {
        state.loading = true
    },
    registerSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true

    },
    registerFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false

    },

    loginRequest: (state) => {
        state.loading = true
    },
    loginSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true

    },
    loginFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false

    },
    updateProfileRequest: (state) => {
        state.loading = true
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload

    },
    updateProfileFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    updatePasswordRequest: (state) => {
        state.loading = true
    },
    updatePasswordSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload

    },
    updatePasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    forgetPasswordRequest: (state) => {
        state.loading = true
    },
    forgetPasswordSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload

    },
    forgetPasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    resetPasswordRequest: (state) => {
        state.loading = true
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload

    },
    resetPasswordFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    logoutRequest: (state) => {
        state.loading = true
    },
    logoutSuccess: (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
    },
    logoutFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true
    },
    deleteProfileRequest: (state) => {
        state.loading = true
    },
    deleteProfileSuccess: (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
    },
    deleteProfileFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true
    },

    loadUserRequest: (state) => {
        state.loading = true
    },
    loadUserSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true

    },
    loadUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    followUserRequest: (state) => {
        state.loading = true
    },
    followUserSuccess: (state, action) => {
        state.loading = false
        state.message = action.payload

    },
    followUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload

    },

    clearErrors: (state) => {
        state.error = null
    }


})
export const postOfFollowingReducer = createReducer(initialState, {
    postOfFollowingRequest: (state) => {
        state.loading = true
    },
    postOfFollowingSuccess: (state, action) => {
        state.loading = false
        state.posts = action.payload
    },
    postOfFollowingFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    }


})

export const userProfileReducer = createReducer(initialState, {
    getUserProfileRequest: (state) => {
        state.loading = true
    },
    getUserProfileSuccess: (state, action) => {
        state.loading = false
        state.user = action.payload
    },
    getUserProfileFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    }
})

export const getAllUserReducer = createReducer(initialState, {
    getAllUserRequest: (state) => {
        state.loading = true
    },
    getAllUserSuccess: (state, action) => {
        state.loading = false
        state.users = action.payload
    },
    getAllUserFailure: (state, action) => {
        state.loading = false
        state.error = action.payload
    },
    clearErrors: (state) => {
        state.error = null
    }


})