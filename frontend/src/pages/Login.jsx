import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import apiUrl from '../api';

function Login(){
    const [form, setForm] = useState({email:'', password:''})
    const navigate = useNavigate();
    
    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        try{
            const res = await axios.post(`${apiUrl}/api/auth/login`, form);
            alert(`Welcome ${res.data.user.name}`);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        }catch(err){
            alert("Login Failed. Check email or password.")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-200 px-4">
            <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-4xl">
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-green-400 mb-6">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="email" name="email" placeholder="Your Email" onChange = {handleChange} required className="w-full border border-gray-300 rounded px-4 py-2"/>
                        <input type="password" name="password" placeholder="Your Password" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2"/>
                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Login</button>
                    </form>
                    <p className="text-sm text-gray-600 mt-4">New User?
                        <Link to='/register' className="text-green-500 hover:underline">
                        Register 
                        </Link>
                    </p>
                </div>

                <div className="hidden md:block w-1/2 bg-green-200">
                    <img src="" alt="" className="object cover w-full h-full" />
                </div>
            </div>
        </div>
    );
}

export default Login;