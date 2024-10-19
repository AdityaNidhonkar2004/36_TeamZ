import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a CSV file");
      return;
    }
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);  
    if(file){
      navigate("/dashboard")
    }
    setUploading(true);
    try {
      const response = await axios.post('https://053e-210-212-183-60.ngrok-free.app/api/multer/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      console.log("Response:", response.data);
    } catch (error) {
      setMessage('Error uploading file');
      console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex'>
    <SideBar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ml-60">
        
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Upload Error-Log text file</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              accept="text/plain"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
    </div>
  );
};

export default Upload;
