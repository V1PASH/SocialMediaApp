import './App.css';
import {BrowserRouter as Router,Routes,Route, useNavigate} from "react-router-dom";
import LoginForm from "./Component/LoginForm";
import Header from "./Component/Header";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import Home from './Component/Home';

function App() {


  const{isAuthenticated}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  useEffect(()=>{
dispatch(loadUser());
  },[dispatch])


  
  return (
    <div className="App ">
        <Router>
            <Routes>
                <Route path="/"element={isAuthenticated?<><Header/><Home/></>:<><LoginForm/></>} />
                <Route path="/newPost"element={isAuthenticated?<><Header/><Home/></>:<><LoginForm/></>} />
                <Route path="/search"element={isAuthenticated?<><Header/><Home/></>:<><LoginForm/></>} />
                <Route path="/account"element={isAuthenticated?<><Header/><Home/></>:<><LoginForm/></>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
