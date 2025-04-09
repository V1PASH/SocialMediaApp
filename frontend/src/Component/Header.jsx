import "../Style/Header.css"
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul className="navlist">
                            <li>
                                <NavLink to="/" className={({isActive})=>isActive?"active":"not-active"}><i className="fa-solid fa-house"></i></NavLink>
                            </li>
                            <li>
                                <NavLink to="/newPost" className={({isActive})=>isActive?"active":"not-active"}><i className="fa-regular fa-square-plus"></i></NavLink>
                            </li>
                            <li>
                                <NavLink to="/search" className={({isActive})=>isActive?"active":"not-active"}><i className="fa-solid fa-magnifying-glass"></i></NavLink>
                            </li>
                            <li>
                                <NavLink to="/account" className={({isActive})=>isActive?"active":"not-active"}><i className="fa-solid fa-user"></i></NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default Header;