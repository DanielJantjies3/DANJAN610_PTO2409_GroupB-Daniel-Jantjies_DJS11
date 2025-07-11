import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black max-w-full text-amber-100 shadow-2xl shadow-black/60 border-b-2 border-b-amber-400/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-yellow-50 drop-shadow-[0_2px_8px_rgba(255,215,100,0.15)] hover:from-yellow-200 hover:via-amber-300 hover:to-yellow-100 transition-all duration-500 select-none"
              style={{ letterSpacing: "0.15em", fontFamily: "serif" }}
            >
              Maybach Music
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="px-4 py-2 rounded-md text-base font-semibold text-amber-100 hover:text-amber-300 hover:bg-black/30 hover:shadow-[0_2px_8px_0_rgba(255,215,100,0.10)] transition-all duration-300 hover:scale-105 border border-transparent hover:border-amber-300/40"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="px-4 py-2 rounded-md text-base font-semibold text-amber-200/70 hover:text-amber-300 hover:bg-black/30 hover:shadow-[0_2px_8px_0_rgba(255,215,100,0.10)] transition-all duration-300 hover:scale-105 border border-transparent hover:border-amber-300/40"
            >
              My Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
