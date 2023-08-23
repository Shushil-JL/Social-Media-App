import React, { useEffect, useState } from 'react'
import "./Register.css"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../Actions/User'
import { Avatar, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const Register = () => {
  const [avatar, setAvatar] = useState()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.user)


  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      if (reader.readyState === 2) {
        // console.log(reader.result)
        setAvatar(reader.result)
      }
    }


  }

  const registerHandler = async (e) => {
    e.preventDefault()
    await dispatch(registerUser(avatar, name, email, password))

  }
  useEffect(() => {
    if (error) {
      dispatch({
        type: "clearErrors"
      })
    }



  }, [dispatch, error])

  return (
    <div className="register">
      <form className="registerForm" onSubmit={registerHandler}>

        <Typography variant='"h3' style={{ padding: "2vmax" }}>
          Social App
        </Typography>

        <Avatar src={avatar} alt='User' sx={{ height: "7vmax", width: "7vmax" }} />
        <input type="file" id='imageInput' accept='image/*' onChange={handleImageChange} />
        <input
          className='registerInput'
          type="text"
          placeholder='User Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='registerInput'
          type="email"
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='registerInput'
          type="password"
          name="password"
          placeholder='Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to='/'>Already Signed Up?Login Now</Link>
        <Button disabled={loading} type='submit'>Sign Up</Button>

      </form>
    </div>
  )
}

export default Register