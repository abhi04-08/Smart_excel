import React, {useState} from 'react';
import axios from 'axios';
import apiUrl from '../api';

const AIInsights = () =>{
    const[file, setFile] = useState(null);
    const[insights, setInsights] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileForInsights = async () => {
        if (!file) return alert("Please select excel file");

        const formData = new FormData();
        formData.append('file', file);

        try{
            const res = await axios.post(`${apiUrl}/api/upload`, formData);
            const excelData = res.data.data;

            const insightsRes = await axios.post(`${apiUrl}/api/insights`, {data : excelData});
            setInsights(insightsRes.data.insights);
        }catch(err) {
            alert('Failed to generate ai insights.');
            console.error(err);
        }
    };

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold text-green-700 mb-4">AI Insights</h1>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <button onClick={handleFileForInsights} className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Generate Insights</button>

            {insights && (
                <div className="mt-6 p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-2 ">Insights:</h2>
                    <pre className="whitespace-pre-wrap text-gray-800">{insights}</pre>
                </div>
            )}
        </div>
    );
};

export default AIInsights;