import { useEffect, useState } from "react";
import axios from "axios";

const GetRecs = ({ artistName }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/recommend", {
          artist_name: artistName,
        });
        setRecommendations(response.data.recommendations);
        setError(null);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Error fetching recommendations");
      }
    };

    if (artistName) {
      fetchRecommendations();
    }
  }, [artistName]);

  return (
    <div className="mt-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap mt-4 justify-center">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-4 m-2 rounded-lg shadow-md"
            >
              {rec}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetRecs;
