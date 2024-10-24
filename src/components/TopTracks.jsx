import { useState, useEffect } from "react";
import { Music, ExternalLink } from "lucide-react";
import { GET } from "pages/api/spotify/route";

const TopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("/api/spotify");
        const data = await response.json();
        setTracks(data.tracks.items.slice(0, 10));
        setLoading(false);
      } catch (err) {
        setError("Failed to load tracks");
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Music className="w-6 h-6 text-green-500" />
        <h1 className="text-2xl font-bold">Spotify Global Top 10</h1>
      </div>

      <div className="space-y-4">
        {tracks.map((item, index) => (
          <div
            key={item.track.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 w-16 h-16">
              <img
                src={
                  item.track.album.images[0]?.url || "/api/placeholder/64/64"
                }
                alt={item.track.album.name}
                className="w-full h-full object-cover rounded"
              />
            </div>

            <div className="ml-4 flex-grow">
              <p className="font-semibold text-lg">{item.track.name}</p>
              <p className="text-gray-600">
                {item.track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-500">
                {Math.floor(item.track.duration_ms / 60000)}:
                {String(
                  Math.floor((item.track.duration_ms % 60000) / 1000),
                ).padStart(2, "0")}
              </span>
              <a
                href={item.track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTracks;
