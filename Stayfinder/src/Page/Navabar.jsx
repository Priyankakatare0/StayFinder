import React, { useEffect, useState } from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Update state on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav className="navbar text-white flex justify-between item-center py-5 px-10 relative z-50">
                <h2 className='navbar-logo text-2xl'>StayFinder</h2>
                <div className="navbar-menu-desktop text-xl flex items-end gap-10">
                    <Link to={"/"} className="navbar-link">Hotels</Link>
                    <Link to={"/add_listing"} className="navbar-link">AddListing</Link>
                    <Link to={"/login"} className="navbar-link">Login</Link>
                </div>
                {/* Mobile Toggle + Menu */}
                {isMobile && (
                  <>
                    <button
                      className="navbar-toggle"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      ☰
                    </button>
                    <div className={`navbar-menu${menuOpen ? ' open' : ''}`}>
                      <Link to="/" className="navbar-link">Hotels</Link>
                      <Link to="/add_listing" className="navbar-link">AddListing</Link>
                      <Link to="/login" className="navbar-link">Login</Link>
                    </div>
                  </>
                )}
            </nav>
        </>
    )
}

export default Navbar