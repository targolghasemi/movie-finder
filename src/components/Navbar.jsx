import { NavLink } from "react-router-dom";

const Navbar = ()=>{
    return(
        <nav className="navbar">
            <h2 className="logo">
                <span className="mov-logo">Movie</span>
                <span className="fin-logo">Finder</span>
            </h2>

            <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/popular">Popular</NavLink>
            <NavLink to="/top-rated">Top Rated</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;