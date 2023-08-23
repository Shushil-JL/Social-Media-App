import React, { useState } from 'react'
import './ResetPassword.css'
import { Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../Actions/User'
import { Link, useParams } from "react-router-dom";
const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // const { loading } = useSelector((state) => state.user)
    const params = useParams()
    // console.log(params.token)
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(resetPassword(params.token, newPassword))

    }
    return (
        <div className='resetPassword'>
            <form className='resetPasswordForm' onSubmit={submitHandler}>
                <Typography variant='"h4' style={{ padding: "2vmax" }}>
                    Social App
                </Typography>

                <input
                    type="password"
                    name="password"
                    className='resetPasswordInput'
                    placeholder='New Password'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    className='resetPasswordInput'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Link to='/'>
                    <Typography>Login!</Typography>
                </Link>
                <Typography>OR</Typography>
                <Link to='/forget/password'>
                    <Typography>Request another token</Typography>
                </Link>

                <Button disabled={newPassword !== confirmPassword} type='submit'>Reset Password</Button>

            </form>



        </div>)
}

export default ResetPassword