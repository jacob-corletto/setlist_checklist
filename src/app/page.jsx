// pages/index.js
'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [artistName, setArtistName] = useState('');
  const [setlists, setSetlists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const fetchSetlists = async () => {
    try {
      const response = await axios.get(`/api/setlists?artistName=${artistName}`);
      setSetlists(response.data.setlists);
    } catch (error) {
      console.error('Error fetching setlists:', error);
    }
  };

  return (
    <div>
      <h1>Setlists App</h1>
      <input
        type="text"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
        placeholder="Enter artist name"
      />
      <button onClick={fetchSetlists}>Fetch Setlists</button>
      <ul>
        {setlists.map((setlist) => (
          <li key={setlist.id}>
            {setlist.eventDate} - {setlist.venue}
          </li>
        ))}
      </ul>
    </div>
    
  );
}
