import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="text-white flex justify-between item-center py-5 px-10 relative z-50">
                <h2 className='text-2xl'>StayFinder</h2>
                <div className="text-xl  flex  items-end gap-10 ">
                    <Link to={"/"}>Hotels</Link>
                    <Link to={"/add_listing"}>AddListing</Link>
                    <Link to={"/login"}>Login</Link>

                </div>
            </nav>
        </>
    )
}

export default Navbar