import { useState, useEffect } from "react";
import { useNearbyEvents } from "pages/api/concert";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER_EVENTS = Array.from({ length: 12 }, (_, i) => ({
  id: `placeholder-${i}`,
  name: `Sample Concert ${i + 1}`,
  dates: {
    start: {
      dateTime: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  _embedded: {
    venues: [
      {
        name: "Local Arena",
      },
    ],
  },
  priceRanges: [
    {
      min: 49.99,
      max: 149.99,
    },
  ],
  url: "#",
}));

export default function NearbyEventsPage() {
  const [coordinates, setCoordinates] = useState({ lat: null, long: null });
  const [locationError, setLocationError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const {
    events: apiEvents,
    loading,
    error,
  } = useNearbyEvents(coordinates.lat, coordinates.long);

  // Use placeholder events if API is down or no events
  const events =
    !loading && apiEvents?.length > 0 ? apiEvents : PLACEHOLDER_EVENTS;

  const totalPages = Math.ceil(events.length / 3);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError(
            "Failed to get your location. Please enable location services.",
          );
        },
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentEvents = events.slice(currentPage * 3, (currentPage + 1) * 3);

  return (
    <div className="p-4">
      {locationError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {locationError}
        </div>
      )}
      {loading && <div className="text-center">Loading...</div>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="relative">
        <div className="flex justify-between items-center mb-4 bg-gray-900 rounded-lg shadow-xl">
          <button
            onClick={prevPage}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6 text-purple-500" />
          </button>
          <h1 className="text-2xl font-bold mb-4 text-white mt-4">
            Music Events Near You
          </h1>
          <button
            onClick={nextPage}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6 text-purple-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="border-2 border-gray-900 bg-gray-900 rounded-lg shadow-xl p-4 transition-all duration-300"
            >
              <div className="w-full h-48 bg-black rounded-t-lg mb-4">
                {event.images?.[0] && (
                  <img
                    src={event.images[0].url}
                    alt={event.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                {event.name}
              </h2>
              <p className="text-white">
                {new Date(event.dates.start.dateTime).toLocaleDateString()} at{" "}
                {new Date(event.dates.start.dateTime).toLocaleTimeString()}
              </p>
              {event._embedded?.venues?.[0] && (
                <p className="text-gray-500 mb-2">
                  {event._embedded.venues[0].name}
                </p>
              )}
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
              >
                Get Tickets
              </a>
            </div>
          ))}
        </div>
      </div>

      {events.length === 0 && !loading && !error && (
        <div className="text-center text-gray-600 mt-8">
          No music events found within 50 miles of your location.
        </div>
      )}
    </div>
  );
}
