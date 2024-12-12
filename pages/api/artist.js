// pages/api/setlists.js
import axios from "axios";

export default async function handler(req, res) {
  const { artistName } = req.query;
  const apiKey = process.env.REACT_APP_API_KEY; // Replace with your Setlist.fm API key

  try {
    const response = await axios.get(
      `https://api.setlist.fm/rest/1.0/search/artists?artistName=${artistName}&sort=sortName`,
      {
        headers: {
          Accept: "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    // Check for successful response
    if (!response.data.artist || !response.data.artist) {
      throw new Error(`Failed to fetch artists for search: ${artistName}`);
    }

    const artists = response.data.artist.map((artist) => ({
      name: artist.name,
      mbid: artist.mbid, // Musicbrainz Identifier (optional)
    }));

    res.status(200).json({ artists });
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
