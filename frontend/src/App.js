import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './Components/Header/Header';
import Login from './Components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/Register/Register';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile'
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserProfile from './Components/UserProfile/UserProfile';
function App() {

  const { isAuthenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())


  }, [dispatch])


  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />}></Route>
        <Route path="/account" element={isAuthenticated ? <Account /> : <Login />}></Route>
        <Route path="/newpost" element={isAuthenticated ? <NewPost /> : <Login />}></Route>
        <Route path='/register' element={isAuthenticated ? <Account /> : <Register />}></Route>
        <Route path='/update/profile' element={isAuthenticated ? <UpdateProfile /> : <Login />}></Route>
        <Route path='/update/password' element={isAuthenticated ? <UpdatePassword /> : <Login />}></Route>
        <Route path='/forget/password' element={isAuthenticated ? <Home /> : <ForgetPassword />}></Route>
        <Route path='/password/reset/:token' element={isAuthenticated ? <Home /> : <ResetPassword />}></Route>
        <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login />}></Route>


      </Routes>

    </Router>
  );

}

export default App;
