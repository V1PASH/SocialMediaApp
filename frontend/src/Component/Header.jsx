import "../Style/Header.css"
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <>
            <header>
                <NavLink to="/" className={({isActive})=>isActive?"active":"not-active"}><i class="fa-solid fa-house"></i></NavLink>
                <NavLink to="/newPost" className={({isActive})=>isActive?"active":"not-active"}><i class="fa-regular fa-square-plus"></i></NavLink>
                <NavLink to="/search" className={({isActive})=>isActive?"active":"not-active"}><i class="fa-solid fa-magnifying-glass"></i></NavLink>
                <NavLink to="/account" className={({isActive})=>isActive?"active":"not-active"}><i class="fa-solid fa-user"></i></NavLink>
            </header>
        </>
    )
}
export default Header;