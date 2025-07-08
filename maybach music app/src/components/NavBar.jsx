import { Link } from "react-router-dom";

function NavBar () {
    return (

    <nav className="navbar bg-gray-900 text-white shadow-lg">
        <div className="maybachLogo max-w-7xl mx-auto px-4">
            <h1><Link to ="/">maybachLogo</Link></h1>
        </div>
        <div className="navBarLinks">
            <Link to="/" className="navLink">Home</Link>
            <Link to="/favorites" className="navLink">Favorites</Link>
        </div>
    </nav>
    )
}

export default NavBar;



