import {  useEffect, useState } from "react";
import{useDispatch, useSelector } from "react-redux"
import {createNewPost } from "../Actions/Post"


function NewPost(){
    const [image,setImage]=useState(null);
    const [caption,setCaption]=useState("");

    const{loading,error,message}=useSelector((state)=>state.like);
    const dispatch=useDispatch();

    function handleImageChange(e){
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            if(reader.readyState===2){
                setImage(reader.result);
            }
        }
    }
    function postHandler(e){
        e.preventDefault();
       dispatch(createNewPost(caption,image));
    }
  
    useEffect(()=>{
        if(error){
            alert(error);
            dispatch({type:"clearError"});
        }
        if(message){
            alert(message);
            dispatch({type:"clearMessage"});
        }
    },[dispatch,error,message]);


    return(
        <>
        <div className="container">
            <div className="new-Post">
                <form action="" className="newPostForm" onSubmit={postHandler}>
                    <h3>New Post</h3>
                    {image && <img src={image} alt="Preview" className="previewImage"/>}
                    <input type="file" accept="image/*" onChange={handleImageChange}/>
                    <input type="text" placeholder="Caption" value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                    <button disabled={loading} type="submit">Post</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default NewPost;