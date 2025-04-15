import  { React,useEffect, useState } from 'react'
import{useDispatch, useSelector } from "react-redux"
import Loader from "./Loader";
import Post from "./Post"
import {getMyPosts ,logoutUser} from "../Actions/User"
import "../Style/Account.css"
import {  NavLink, useNavigate } from 'react-router-dom';
import User from "../Component/User"


function Account ()  {

    const {loading,error,posts}=useSelector((state)=>state.myPosts)

    const{error:likeError,message}=useSelector(state=>state.like)
    let navigate = useNavigate();
    const {user}=useSelector((state)=>state.user)

    const [followerList,setFollowerList]=useState(false)
    const [followingList,setFollowingList]=useState(false)
    const [moreProfileOptions,setMoreProfileOptions]=useState(false)
    const logoutHandler=()=>{
        dispatch(logoutUser())
        navigate("/")
    }

    const dispatch=useDispatch();
        useEffect(()=>{
            dispatch(getMyPosts())
        },[dispatch]) 

   
  return (
    loading?<Loader/>:
    <section className="Account-page">
        <div className="container">
            <div className="profile">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="profile-img">
                            <img src={user.avatar.url} alt="" />
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="row">
                            <p>{user.username}</p>
                        </div>
                        <div className="row">
                            <div className="info">
                                <div className="followers">
                                    <button onClick={()=>setFollowerList(!followerList)}>
                                        {user.followers.length}
                                        <br />
                                        Followers
                                    </button>
                                </div>
                                <div className="following">
                                    <button onClick={()=>setFollowingList(!followingList)}>
                                        {user.following.length}
                                        <br />
                                        Following
                                    </button>
                                </div>
                                <div className="posts-count">
                                    {user.posts.length}
                                    <br />
                                    Posts
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Profile-options">
                    <div className="edit-Profile">
                        <button onClick={()=>setMoreProfileOptions(!moreProfileOptions)}>
                            Profile Settings
                        </button>
                    </div>
                </div>
            </div>
            {
                moreProfileOptions?(
                <div className="more-profile-options">   
                    <ul>
                        <li className="close-btn">
                           <h5>More Options</h5> <button onClick={()=>setMoreProfileOptions(!moreProfileOptions)}><i class="fa-solid fa-circle-xmark" style={{color:"red"}} /></button>
                        </li>
                        <li>
                            <NavLink to="/update/profile" className="edit-profile-btn">
                                Edit Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/update/password" className="edit-profile-btn">
                                Change Password
                            </NavLink>
                        </li>
                        <li>
                            <button className="logout-btn" onClick={logoutHandler}>
                                Logout 
                            </button>
                        </li>
                        <li>
                            <button className="delete-profile-btn">
                                delete my profile
                            </button>
                        </li>
                    </ul>
                </div>):""
            }
            <div className="posts">

                <div className="row">
                    {
                        posts && posts.length>0?   
                        posts.map((post)=>
                            <div className="col-sm-4">
                                <Post
                                key={post._id}
                                postId={post._id}
                                caption={post.caption}
                                postImage={post.image?.url} 
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={user?.avatar?.url} 
                                ownerName={user.name}
                                ownerId={post.owner?._id}
                                />
                            </div>):""
                    }
                </div>
            </div>


            {followerList?
            
                <div className="followers-list">
                <div className="top-sec">
                    <h5>Followers</h5>
                <button><i class="fa-solid fa-circle-xmark" style={{color:"red"}} onClick={()=>setFollowerList(!followerList)}></i></button>
                </div>
                    <ul>
                    
                    {
                        user && user.followers.length>0?user.followers.map(
                            (follower)=>((
                                <li>

                                <User
                                key={follower}
                                userId={follower._id}
                                name={follower.name}
                                avatar={follower.avatar.url}
                                />
                                </li>
                            ))
                        ):""
                    }
                    </ul>
                </div>
            
            :""
        }
        {followingList?(
        <div className="following-list">
        <div className="top-sec">
            <h5>Following</h5>
        <button><i class="fa-solid fa-circle-xmark" style={{color:"red"}} onClick={()=>setFollowingList(!followingList)}></i></button>
        </div>
            <ul>
            
            {
                user && user.following.length>0?user.following.map(
                    (following)=>((
                        <li>

                        <User
                        key={following}
                        userId={following._id}
                        name={following.name}
                        avatar={following.avatar.url}
                        />
                        </li>
                    ))
                ):""
            }
            </ul>
        </div>
    
        ):""
        }
 
        </div>
    </section>
  )
}

export default Account
