import { useEffect, useState } from "react";

const getLocation = (step) => {
  const [coordinates, setCoordinates] = useState(null);
  useEffect(() => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [step]);
  if (coordinates != null) {
    return coordinates;
  }
};

export default getLocation;
