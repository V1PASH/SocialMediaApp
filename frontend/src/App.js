import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoginForm from "./Component/LoginForm";
import Header from "./Component/Header";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import Home from './Component/Home';
import RegisterNow from './Component/RegisterNow';
import Account from './Component/Account';

function App() {


  const{isAuthenticated}=useSelector((state)=>state.user)
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(loadUser());
  },[dispatch])
  
  return (
    
    <div className="App">
      <Router>
            <Routes>
                <Route path="/"element={isAuthenticated?<><Header/><Home/></>:<><LoginForm/></>} />
                <Route path='/register' element={<RegisterNow/>}/>
                <Route path="/newPost"element={isAuthenticated?<><Header/></>:<><LoginForm/></>} />
                <Route path="/search"element={isAuthenticated?<><Header/></>:<><LoginForm/></>} />
                <Route path="/account"element={isAuthenticated?<><Header/><Account/></>:<><LoginForm/></>} />
            </Routes>
        </Router>        
    </div>
  );
}

export default App;
