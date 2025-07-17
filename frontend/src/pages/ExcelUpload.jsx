import React, {useState, useRef} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import apiUrl from '../api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ExcelUpload() {
    const chartRef = useRef(null);
    const[file, setFile] = useState(null);
    const[data, setData] = useState([]);
    const[columns, setColumns] = useState([]);
    const[xAxis, setXAxis] = useState('');
    const[yAxis, setYAxis] = useState('');
    const[showChart, setShowChart] = useState(false);
    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);
    };

    const handleUpload = async () =>{
        if(!file) return alert('Please select a file.');
        
        const formData = new FormData();
        formData.append('file', file);

        try{
            const res = await axios.post(`${apiUrl}/api/upload`, formData);
            setData(res.data.data);
            setColumns(Object.keys(res.data.data[0]));
            setShowChart(false);
        }catch (err){
            alert('Upload Failed.');
        }
    };

    const chartData = {
        labels: data.map((row) => row[xAxis]),
        datasets: [
            {
                label: `${yAxis} vs ${xAxis}`,
                data: data.map((row) => row[yAxis]),
                backgroundColor: 'rgba(34,197,94,0.7)'
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {position:'top'},
            title:{display:'true', text:'Generated Chart'}
        }
    };
    
    const handleGenerate = () =>{
        if (!xAxis || !yAxis) return  alert('Please select both X and Y axis');
        setShowChart(true);
        alert(`Ready to plot: X = ${xAxis}, Y = ${yAxis}`);
    };

    const downloadAsImage = async (format='png') => {
        if (!chartRef.current) return;

        const chart = chartRef.current;
        const canvas = chart.canvas;
        const imageData = canvas.toDataURL(`image/${format}`);

        localStorage.setItem('lastDownloadedChart', imageData);

        const link = document.createElement('a');
        link.download = `chart.${format}`;
        link.href = imageData;
        link.click();
    };

    const downloadAsPDF = async () => {
        if(!chartRef.current) return;

        const canvas = chartRef.current.canvas;
        const canvasImage = await html2canvas(canvas);
        const imgData = canvasImage.toDataURL('image/png');
        const pdf = new jsPDF();
        localStorage.setItem('lastDownloadedChart', imgData)
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0 , 0, pdfWidth, pdfHeight);
        pdf.save('chart.pdf');  
    }

    return(
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
                    <button className="bg-green-400 text-white px-6 py-4 rounded hover:bg-green-600">Logout</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-100 min-h-screen">
                        <h1 className="text-2xl font-bold mb-4">Upload Excel file</h1>
                        <input type="file" accept=".xlsx" onChange={handleFileChange} className="mb-4"/>
                        <button onClick={handleUpload} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Upload</button>
                        {columns.length > 0 && (
                            <div className="mt-6">
                                <h2 className="text-xl mb-2 font-semibold">Select Axes for Chart</h2>
                                <div className="flex gap-4 mb-4">
                                    <select value={xAxis} onChange={(e) =>{setXAxis(e.target.value); setShowChart(false);}} className="px-3 py-2 rounded border">
                                        <option value="">Select X-Axis</option>
                                        {columns.map((col) => (
                                            <option value={col} key={col}>{col}</option>
                                        ))}
                                    </select>
                                    <select value={yAxis} onChange={(e) => {setYAxis(e.target.value); setShowChart(false);}} className="px-3 py-2 rounded border">
                                        <option value="">Select Y-Axis</option>
                                        {columns.map((col) => (
                                            <option value={col} key={col}>{col}</option>
                                        ))}
                                    </select>
                                </div>
                                <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Generate Chart 
                                </button>

                                {showChart && xAxis && yAxis && (
                                    <div className='bg-white p-6 rounded shadow mt-6'>
                                        <Bar data={chartData} ref={chartRef} options={options}/>

                                        <div className="mt-4 flex gap-4">
                                            <button onClick={() => downloadAsImage('png')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" >
                                                Download as PNG
                                            </button>
                                            <button onClick={() => downloadAsPDF()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                                Download as PDF
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExcelUpload;