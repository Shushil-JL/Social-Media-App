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

    logoutRequest: (state, action) => {
        state.loading = true

    },
    logoutSuccess: (state, action) => {
        state.loadig = false
        state.isAuthenticated = false

    },
    logoutFailure: (state, action) => {
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
    clearErrors:(state)=>{
        state.error= null
    }


})
export const postOfFollowingReducer = createReducer(initialState,{
    postOfFollowingRequest:(state)=>{
        state.loading = true
    },
    postOfFollowingSuccess:(state,action)=>{
        state.loading = false
        state.posts= action.payload
    },
    postOfFollowingFailure:(state,action)=>{
        state.loading= false
        state.error= action.payload
    },
    clearErrors:(state)=>{
        state.error=null
    }
    

})

export const getAllUserReducer = createReducer(initialState,{
    getAllUserRequest:(state)=>{
        state.loading = true
    },
    getAllUserSuccess:(state,action)=>{
        state.loading = false
        state.users= action.payload
    },
    getAllUserFailure:(state,action)=>{
        state.loading= false
        state.error= action.payload
    },
    clearErrors:(state)=>{
        state.error=null
    }
    

})