import React, {useState, useEffect} from 'react';

const Downloads = () => {
    const[image, setImage] = useState(null);

    useEffect(() => {
        const imgData = localStorage.getItem('lastDownloadedChart');
        setImage(imgData)
    }, []);

    return(
        <div className="min-h-screen bg-green-50 p-10">
            <h1 className="text-3xl font-bold text-green-700 mb-6">Last Downloaded Chart</h1>
            {image ? (
                <div className="bg-white p-6 rounded shadow">
                    <img src={image} alt="Downloaded Chart" className="w-full max-w-3xl mx-auto rounded"/>
                    <a href={image} download="chart.png" className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Download PNG again.</a>
                </div>
            ) : (
                <p className="text-gray-700">No chart has been downloaded yet.</p>
            )}
        </div>
    );
};

export default Downloads;