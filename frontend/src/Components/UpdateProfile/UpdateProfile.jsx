import React, { useEffect, useState } from 'react'
import "./UpdateProfile.css"
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updateProfile } from '../../Actions/User'
import { Avatar, Button, Typography } from '@mui/material'
import Loader from "../Loader/Loader"


const UpdateProfile = () => {
    const { user, loading, error } = useSelector((state) => state.user)
    const { loading: updateLoading } = useSelector((state) => state.like)

    const [avatar, setAvatar] = useState()
    const [name, setName] = useState(user.name.substring(1))
    const [email, setEmail] = useState(user.email)
    const [avatatPrev, setAvatatPrev] = useState(user.avatar.url)

    const dispatch = useDispatch()



    const handleImageChange = (e) => {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            if (reader.readyState === 2) {
                // console.log(reader.result)
                setAvatar(reader.result)
                setAvatatPrev(reader.result)
            }
        }


    }

    const updateHandler = async (e) => {
        e.preventDefault()

        await dispatch(updateProfile(avatar, name, email))
        dispatch(loadUser())

    }
    useEffect(() => {
        if (error) {
            dispatch({
                type: "clearErrors"
            })
        }



    }, [dispatch, error])

    return loading ? (<Loader />) : (
        <div className="updateProfile">
            <form className="updateProfileForm" onSubmit={updateHandler}>

                <Typography variant='"h3' style={{ padding: "2vmax" }}>
                    Social App
                </Typography>

                <Avatar src={avatatPrev} alt='User' sx={{ height: "10vmax", width: "10vmax" }} />
                <input type="file" accept='image/*' onChange={handleImageChange} />
                <input
                    className='updateProfileInput'
                    type="text"
                    placeholder='User Name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className='updateProfileInput'
                    type="email"
                    placeholder='Email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button disabled={updateLoading} type='submit'>Update</Button>

            </form>
        </div>
    )
}

export default UpdateProfile