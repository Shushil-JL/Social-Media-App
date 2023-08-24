import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from 'react'
import { getAllUsers } from '../../Actions/User';
import User from '../User/User'
import './Search.css'

const Search = () => {

    const [name, setName] = useState("")
    const { users, loading } = useSelector((state) => state.allUsers)

    const dispatch = useDispatch()

    const searchHandler = (e) => {
        e.preventDefault()
        dispatch(getAllUsers(name))


    }
    return (
        <div className="search">
            <form className="searchForm" onSubmit={searchHandler}>

                <Typography variant='"h3' style={{ padding: "2vmax" }}>
                    Social App
                </Typography>

                <input
                    className='updateProfileInput'
                    type="text"
                    placeholder='Search User'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button disabled={loading} type='submit'>Search</Button>
                <div className="searchResult">
                    {users && users.map(user => (
                        <User
                            key={user._id}
                            userId={user._id}
                            avatar={user.avatar.url}
                            name={user.name}
                        />

                    ))}
                </div>

            </form>
        </div>
    )
}

export default Search