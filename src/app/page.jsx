// pages/index.js
'use client'
import { useState } from 'react';
import axios from 'axios';
import SetlistComponent from '@/components/SetlistComponent';
import styles from './/page.module.css';
// import 'styles/globals.css';

export default function Home() {
  const [artistName, setArtistName] = useState('');
  const [setlists, setSetlists] = useState([]);
  const [Error, setError] = useState(null);

  const fetchSetlists = async () => {
    try {
      const response = await axios.get(`/api/setlists?artistName=${artistName}`);
      setSetlists(response.data.setlists);
      setError(null);
    } catch (error) {
      console.error('Error fetching setlists:', error);
      setError('Error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>Setlist Checklist</div>
        <div className={styles.search}>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Search artist..."
          />
          <button onClick={fetchSetlists}>Search</button>
        </div>
      </div>

      <div className={styles.main_content}>
        {Error ? <p>Artist not found try another or try again later</p>:
        <div className={styles.main_view}>
          <SetlistComponent setlists={setlists} />
        </div>
        }
      </div>
      <div className='text-center text-size-lg'>
        Welcome back loser...
      </div>
      
      <div className='text-center text-size-lg border-2 border-black'>
        place concerts in area here...
      </div>
      
    </div>
  );
}