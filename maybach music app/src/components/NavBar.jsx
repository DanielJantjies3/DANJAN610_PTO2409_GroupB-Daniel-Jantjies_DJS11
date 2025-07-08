import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gradient-to-r max-w-full from-purple-900 via-indigo-900 to-gray-900 text-white shadow-lg shadow-indigo-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-mystical tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-200 hover:from-amber-200 hover:via-pink-300 hover:to-purple-300 transition-all duration-500"
            >
              Maybach
            </Link>
          </div>

       
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/50 hover:text-amber-100 transition-all duration-300 hover:scale-105"
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800/50 hover:text-amber-100 transition-all duration-300 hover:scale-105"
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;



