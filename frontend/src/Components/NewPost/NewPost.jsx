import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"

import "./NewPost.css"
import { createNewPost } from '../../Actions/Post'

const NewPost = () => {

    const [image, setImage] = useState(null)
    const [caption, setcaption] = useState("")

    const { loading, error, message } = useSelector((state) => state.like)
    const dispatch = useDispatch()

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            if (reader.readyState === 2) {
                // console.log(reader.result)
                setImage(reader.result)
            }
        }


    }

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(createNewPost(caption, image))
        setImage(null)
        setcaption("")

    }
    useEffect(() => {
        if (error) {
            dispatch({ type: "clearError" })
        }
        if (message) {
            dispatch({ type: "clearMessage" })
        }
    }, [dispatch, error, message])


    return (
        <div className='newPost' >
            <form className='newPostForm' onSubmit={submitHandler} >

                <Typography variant='h3'>New Post</Typography>
                {image && <img src={image} alt="post" />}
                <input type="file" accept='image/*' onChange={handleImageChange} />
                <input type="text" placeholder='caption...' value={caption} onChange={(e) => setcaption(e.target.value)} />
                <Button disabled={loading} type='submit'>Post</Button>
            </form>
        </div>
    )
}

export default NewPost