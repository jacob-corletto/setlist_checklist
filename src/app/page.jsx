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

  const fetchSetlists = async () => {
    try {
      const response = await axios.get(`/api/setlists?artistName=${artistName}`);
      setSetlists(response.data.setlists);
    } catch (error) {
      console.error('Error fetching setlists:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>Your App Name</div>
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
        {/*<div className={styles.sidebar}>

        </div>*/}

        <div className={styles.main_view}>
          <SetlistComponent setlists={setlists} />
        </div>
      </div>

      <div className={styles.footer}>
        <div> This is the footer</div>
      </div>
    </div>
  );
}