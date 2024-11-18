import { useState, useEffect } from "react";
import axios from "axios";

const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;
const BASE_URL = process.env.BASE_URL;

// For Next.js 13+ App Router
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");

  if (!lat || !long) {
    return Response.json(
      { error: "Latitude and longitude are required" },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: TICKETMASTER_API_KEY,
        latlong: `${lat},${long}`,
        radius: 50, // 50-mile radius
        unit: "miles",
        size: 20, // Number of results per page
        sort: "date,asc", // Sort by date ascending
        classificationName: "music", // Filter to only music events
      },
    });

    return Response.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Internal server error";
    return Response.json({ error: message }, { status });
  }
}

export function useNearbyEvents(lat, long) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!lat || !long) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&radius=50&unit=miles&size=20&sort=date,asc&apikey=W17XQeN7pQghp72lIoFVFoATbiJjcAfi&latlong=" +
            `${lat},${long}`,
          // {
          //   params: {
          //     latlong: `${lat},${long}`,
          //     apikey: process.env.TICKETMASTER_API_KEY,
          //   },
          // },
        );
        setEvents(response.data._embedded?.events || []);
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [lat, long]);

  return { events, loading, error };
}
