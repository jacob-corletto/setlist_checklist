// pages/api/setlists.js
import axios from 'axios';

export default async function handler(req, res) {
  const { artistName } = req.query;
  const apiKey = process.env.REACT_APP_API_KEY; // Replace with your Setlist.fm API key

  try {
    const response = await axios.get(
      `https://api.setlist.fm/rest/1.0/search/setlists?artistName=${artistName}`,
      {
        headers: {
          Accept: 'application/json',
          'x-api-key': apiKey,
        },
      }
    );

    const setlists = response.data.setlist.map((setlist) => ({
      id: setlist.id,
      eventDate: setlist.eventDate,
      venue: setlist.venue.name,
    }));

    res.status(200).json({ setlists });
  } catch (error) {
    console.error('Error fetching setlists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
