import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './Components/Header/Header';
import Login from './Components/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';
function App() {

  const { isAuthenticated } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [])


  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />}></Route>
      </Routes>

    </Router>
  );
}

export default App;
