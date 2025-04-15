import "../Style/Home.css"
import Post from "../Component/Post"
import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getFollowingPost } from "../Actions/User";
import Loader from "./Loader";
function Home(){
    const dispatch=useDispatch();

    const{loading,posts,error}=useSelector(state=>state.postOfFollowing)
    const{error:likeError,message}=useSelector(state=>state.like)
    useEffect(()=>{
        dispatch(getFollowingPost())
    },[dispatch])
    

    return(
        loading?<Loader/>:
        <>
            <section className="Home">
                <div className="container">
                    <div className="home">
                        <div className="row">
                            <div className="col-md-12">
                               {posts && posts.length>0?
                               posts.map((post)=>
                                <Post
                               key={post._id}
                               postId={post._id}
                               caption={post.caption}
                               postImage={post.image?.url} // <-- Safe
                               likes={post.likes}
                               comments={post.comments}
                               ownerImage={post.owner?.avatar?.url} // <-- Safe
                               ownerName={post.owner?.name}
                               ownerId={post.owner?._id}
                             />
                             )
                               :(<p>No Posts</p>)}
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home