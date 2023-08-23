import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import './ForgetPassword.css'
import { forgetPassword } from '../../Actions/User'



const ForgetPassword = () => {

    const [email, setEmail] = useState('')
    const { loading } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const submitHandler = async (e) => {
        e.preventDefault()

        await dispatch(forgetPassword(email))

    }

    return (
        <div className='forgetPassword'>
            <form className='forgetPasswordForm' onSubmit={submitHandler}>
                <Typography variant='"h4' style={{ padding: "2vmax" }}>
                    Social App
                </Typography>

                <input
                    type="email"
                    name="email"
                    className='forgetPasswordInput'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button disabled={loading} type='submit'>Send Token</Button>

            </form>



        </div>)
}

export default ForgetPassword