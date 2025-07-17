import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../api';

function Register(){
    const [ form, setForm] = useState({ name:'', email:'', password:''});

    const handleChange = (e) => {
        setForm({ ...form,[e.target.name]: e.target.value});
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        try{
            const res = await axios.post(`${apiUrl}/api/auth/register`, form);
            alert(res.data);
        }catch(err) {
            alert("Registration Failed.")
        }
    };

    return (
        <div className="min-h-screen items-center justify-center flex bg-green-100 px-4 ">
            <div className="w-full flex bg-white rounded-lg shadow-lg max-w-4xl overflow-hidden">
                <div className="w-full md:w-1/2 p-8">
                <h2 className="text-3xl font-bold mb-6 text-green-400"> Create Account </h2>
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <input type="name" name="name" placeholder="Your Name" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                    <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                    <input type="password" name="password" placeholder="Your Password" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Register</button>
                </form>
                <p className="text-sm text-gray-600 mt-4">Already Have an Account?{' '}
                    <Link to="/login" className="text-green-500 hover:underline">
                    Login 
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

export default Register;