// pages/api/concerts.js
import axios from "axios";

export default async function handler(req, res) {
  const { lat, lng } = req.query;
  consol.log({ lat, lng });
  try {
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=${process.env.TICKETMASTER_API_KEY}`,
      {
        params: {
          apikey: process.env.TICKETMASTER_API_KEY,
          latlong: `${lat},${lng}`,
          radius: "50", // 50 mile radius
          classificationName: "music",
          size: 20, // number of events to return
          sort: "date,asc",
        },
      },
    );

    if (response.data._embedded?.events) {
      const concerts = response.data._embedded.events.map((event) => ({
        id: event.id,
        artist: event.name,
        image: event.images?.[0]?.url || "/api/placeholder/300/300",
        date: event.dates.start.dateTime || event.dates.start.localDate,
        venue: event._embedded?.venues?.[0]?.name || "Venue TBA",
      }));

      res.status(200).json(concerts);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error("Error fetching concerts:", error);
    res.status(500).json({ error: "Error fetching concerts" });
  }
}
