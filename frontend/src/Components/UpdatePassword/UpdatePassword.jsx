import React, { useState } from 'react'
import './UpdatePassword.css'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updatePassword } from '../../Actions/User'




const UpdatePassword = () => {

    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState('')

    const { loading } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const updatePasswordHandler = async (e) => {
        e.preventDefault()
        await dispatch(updatePassword(oldPassword, newPassword))
        dispatch(loadUser())

    }

    return (
        <div className='updatePassword'>
            <form className='updatePasswordForm' onSubmit={updatePasswordHandler}>
                <Typography variant='"h4' style={{ padding: "2vmax" }}>
                    Social App
                </Typography>

                <input
                    type="password"
                    name="oldPassword"
                    className='updatePasswordInput'
                    placeholder='Old Password'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    name="newPassword"
                    className='updatePasswordInput'
                    placeholder='New Password'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                {/* <Link to="/forget/password">
                    <Typography>Forget Password</Typography>
                </Link> */}
                <Button disabled={loading} type='submit'>Change Password</Button>
                {/* <Link to="/register">New User?</Link> */}

            </form>



        </div>)
}

export default UpdatePassword