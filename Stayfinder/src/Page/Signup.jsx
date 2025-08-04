import { authAPI } from '../api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navabar';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        authAPI.signup({ username, password, email })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="relative min-h-screen bg-black">
                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1667125094717-47e0ff6d0608?q=80&w=2063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <Navbar />
                {/* Signup Form */}
                <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                    <div className="bg-black bg-opacity-90 text-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                        <h2 className="text-2xl font-bold mb-6">Join StayFinder</h2>

                        {/* Tabs */}
                        <div className="flex mb-6">
                            <Link to="/login" className="w-1/2">
                                <button className="w-full py-2 bg-gray-800 text-white rounded-l-lg">Login</button>
                            </Link>
                            <button className="w-1/2 py-2 bg-white text-black font-semibold rounded-r-lg">Signup</button>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="bg-gray-900 border border-gray-600 px-4 py-2 rounded text-white placeholder-gray-400 focus:outline-none"
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="bg-gray-900 border border-gray-600 px-4 py-2 rounded text-white placeholder-gray-400 focus:outline-none"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="bg-gray-900 border border-gray-600 px-4 py-2 rounded text-white placeholder-gray-400 focus:outline-none"
                                autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-white text-black py-2 rounded font-semibold hover:bg-gray-300 transition"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="text-sm mt-4">
                            Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
