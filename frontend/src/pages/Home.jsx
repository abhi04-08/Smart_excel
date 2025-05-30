import React from 'react';
import {Link} from 'react-router-dom';

function Home(){
    return (
        <div className="h-full min-h screen flex flex-col justify-center items-center bg-black text-blue">
            <h2 className="text-3xl font-bold mb-4 p-0 text-red-500 m-0">Smart Excel</h2>
            <h1 className="text-5xl font-bold mb-4 p-10 text-red-500">Welcome to Smart Excel!!</h1>
            <p className="text-lg mb-8 text-red-500">Upload excel files, analyze your data with smart 3D charts and download the reports.</p>
            <div flex space-x-4>
                <Link to="/login">
                <button className="bg-white text-red-500 px-7 py-7 rounded-full shadow-md hover:bg-yellow-300 transition mr-20">
                Login 
                </button>
                </Link>
                <Link to="/register">
                <button className="bg-white text-red-500 px-6 py-6 rounded-full shadow-md hover:bg-yellow-300 transition">
                Register 
                </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;