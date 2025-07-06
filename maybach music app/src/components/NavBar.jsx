import { Link } from "react-router-dom";

function NavBar () {
    return (

    <nav className="navbar">
        <div className="maybachLogo">
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

// Note: The NavBar component is currently empty. You can add links or other elements as needed.