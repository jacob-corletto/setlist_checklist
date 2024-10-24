import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ConcertGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingPlaceholder, setUsingPlaceholder] = useState(false);

  // Fallback data in case of API/location issues
  const placeholderConcerts = [
    {
      id: "p1",
      artist: "Popular Artist",
      image: "/api/placeholder/300/300",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
      venue: "Major Arena",
      isPlaceholder: true,
    },
    {
      id: "p2",
      artist: "Rock Band",
      image: "/api/placeholder/300/300",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
      venue: "Stadium venue",
      isPlaceholder: true,
    },
    {
      id: "p3",
      artist: "Pop Singer",
      image: "/api/placeholder/300/300",
      date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks from now
      venue: "Concert Hall",
      isPlaceholder: true,
    },
    {
      id: "p4",
      artist: "Jazz Ensemble",
      image: "/api/placeholder/300/300",
      date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(), // 4 weeks from now
      venue: "Music Center",
      isPlaceholder: true,
    },
    {
      id: "p5",
      artist: "Local Band",
      image: "/api/placeholder/300/300",
      date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(), // 5 weeks from now
      venue: "City Auditorium",
      isPlaceholder: true,
    },
  ];

  useEffect(() => {
    const fetchConcerts = async (position) => {
      try {
        const response = await fetch(
          `/api/concerts?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch concerts");
        }

        const data = await response.json();
        if (data.length === 0) {
          setUsingPlaceholder(true);
          setConcerts(placeholderConcerts);
        } else {
          setConcerts(data);
        }
      } catch (err) {
        console.error("API Error:", err);
        setUsingPlaceholder(true);
        setConcerts(placeholderConcerts);
        setError(
          "Unable to fetch concert data. Showing placeholder concerts instead.",
        );
      } finally {
        setLoading(false);
      }
    };

    const handleLocationError = (error) => {
      console.error("Location Error:", error);
      setUsingPlaceholder(true);
      setConcerts(placeholderConcerts);
      setError("Location access denied. Showing placeholder concerts instead.");
      setLoading(false);
    };

    // Wrap geolocation in try-catch for browsers that don't support it
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          fetchConcerts,
          handleLocationError,
          {
            timeout: 10000, // 10 second timeout
            maximumAge: 0, // Don't use cached position
            enableHighAccuracy: false,
          },
        );
      } else {
        setUsingPlaceholder(true);
        setConcerts(placeholderConcerts);
        setError(
          "Geolocation is not supported by your browser. Showing placeholder concerts instead.",
        );
        setLoading(false);
      }
    } catch (err) {
      setUsingPlaceholder(true);
      setConcerts(placeholderConcerts);
      setError(
        "Unable to access location services. Showing placeholder concerts instead.",
      );
      setLoading(false);
    }
  }, []);

  const maxIndex = Math.max(0, concerts.length - 3);

  const scrollToIndex = (index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const visibleConcerts = concerts.slice(currentIndex, currentIndex + 3);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="p-0">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {usingPlaceholder
          ? "Check out what's near you"
          : "Check out what's near you"}
      </h1>

      {error && (
        <Alert className="mb-6">
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative max-w-5xl mx-auto">
        {currentIndex > 0 && (
          <button
            onClick={() => scrollToIndex(currentIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
            aria-label="Previous concert"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {currentIndex < maxIndex && (
          <button
            onClick={() => scrollToIndex(currentIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100 transition-colors"
            aria-label="Next concert"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        <div className="grid grid-cols-3 gap-8">
          {visibleConcerts.map((concert) => (
            <Card
              key={concert.id}
              className={`hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                concert.isPlaceholder ? "border-dashed" : ""
              }`}
            >
              <CardHeader className="p-0">
                <img
                  src={concert.image}
                  alt={`${concert.artist} concert`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{concert.artist}</h2>
                <p className="text-gray-600">
                  {new Date(concert.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-500 text-sm">{concert.venue}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-purple-700 w-4" : "bg-gray-300 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConcertGrid;
