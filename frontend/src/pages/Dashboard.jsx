import React from 'react';
import {Link} from 'react-router-dom';

function Dashboard(){
    return (
        <div className="min-h-screen bg-green-100 flex ">
            <div className="bg-green-600 w-64 text-white flex flex-col px-4 py-6">
                <h2 className="text-2xl font-bold mb-8">Smart Excel </h2>
                <nav className="flex flex-col gap-4">
                    <a href="/dashboard" className="hover:bg-green-600 px-3 py-2 rounded">Dashboard</a>
                    <a href="/upload" className="hover:bg-green-600 px-3 py-2 rounded">Upload Excel </a>
                    <a href="/history" className="hover:bg-green-600 px-3 py-2 rounded">History </a>
                    <a href="/downloads" className="hover:bg-green-600 px-3 py-2 rounded">Downloads</a>
                    <a href="/insights" className="hover:bg-green-600 px-3 py-2 rounded">AI Insights</a>
                </nav>
            </div>

            <div className="flex-1 p-10">
                <div className="flex justify-between items-center text-green-600">
                    <h1 className="text-3xl font-semibold text-green-600">Welcome User</h1>
                    <button className="bg-green-400 text-white px-6 py-4 rounded hover:bg-green-600"><Link to="/login">Logout</Link></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/downloads">
                       <div className="bg-white shadow-md pd-6 rounded">
                            <h3 className="text-xl font-semibold mb-2">Downloads</h3>
                            <p>You can check the latest downloaded charts.</p>
                      </div>
                    </Link>
                    <Link to="/insights">
                    <div className="bg-white shadow-md pd-6 rounded">
                        <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
                        <p>Use AI for automatic summaries and patterns.</p>
                    </div>
                    </Link>
                    <Link to="/history">
                    <div className="bg-white shadow-md pd-6 rounded">
                        <h3 className="text-xl font-semibold mb-2">Upload History</h3>
                        <p>Track you excel files you have uploaded recently.</p>
                    </div>
                    </Link>
                    
                    <Link to="/upload">
                        <div className="bg-white shadow-md pd-6 rounded">
                            <h3 className="text-xl font-semibold mb-2">Excel Upload </h3>
                            <p>Upload your Excel file for data analysis.</p>
                        </div>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default Dashboard;