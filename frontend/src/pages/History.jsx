import React, {useState, useEffect} from 'react';
import axios from 'axios';
import apiUrl from '../api';

const History = () => {
    const[uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchHistory = async () =>{
            try{
                const res = await axios.get(`${apiUrl}/api/upload/history`);
                setUploads(res.data);
            }catch(err){
                console.error('Error fetching the data', err);
            }
        };

        fetchHistory();
    }, []);

    return(
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Upload History</h2>
            {uploads.length === 0? (
                <p>No uploads found.</p>
            ) : (
             <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-green-100">
                        <th className="py-2 px-4 border">FileName</th>
                        <th className="py-2 px-4 border">Upload Date</th>
                    </tr>
                </thead>
                <tbody>
                    {uploads.map((file, idx) => (
                        <tr key={idx} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{file.originalname}</td>
                            <td className="px-4 py-2 border">{new Date(file.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
             </table>
            )}
        </div>
    );
};

export default History;