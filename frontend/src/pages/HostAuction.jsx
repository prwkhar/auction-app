import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HostAuction = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [startingBid, setStartingBid] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the file object
  };

  const handleHostAuction = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');

      // Create FormData object
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image); // File upload
      formData.append('startingBid', startingBid);
      formData.append('startTime', startTime);
      formData.append('endTime', endTime);

      const res = await axios.post('http://localhost:8000/api/v1/auctions/host', 
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data' // Important for file upload
          } 
        }
      );

      alert('Auction hosted successfully!');
      navigate(`/auction/${res.data.data._id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to host auction');
    }
  };

  return (
    <div className="bg-green-600/50 rounded-2xl mt-10 mx-auto p-4 max-w-md text-white">
      <h1 className="text-2xl font-bold mb-5">Host Auction</h1>
      <form onSubmit={handleHostAuction} className="flex flex-col">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="border p-2 mb-2 rounded-2xl" 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="border p-2 mb-2 rounded-2xl" 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="border p-2 mb-2 rounded-2xl" 
        />
        <input 
          type="number" 
          placeholder="Starting Bid" 
          value={startingBid} 
          onChange={(e) => setStartingBid(Number(e.target.value))} 
          className="border p-2 mb-2 rounded-2xl" 
        />
        <input 
          type="datetime-local" 
          placeholder="Start Time" 
          value={startTime} 
          onChange={(e) => setStartTime(e.target.value)} 
          className="border p-2 mb-2 rounded-2xl" 
        />
        <input 
          type="datetime-local" 
          placeholder="End Time" 
          value={endTime} 
          onChange={(e) => setEndTime(e.target.value)} 
          className="border p-2 mb-2 rounded-2xl" 
        />
        <button type="submit" className="bg-green-500 hover:bg-green-600 rounded-2xl mt-4 text-white p-2">Host Auction</button>
      </form>
    </div>
  );
};

export default HostAuction;
