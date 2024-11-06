import { useEffect, useRef, useState } from "react";
import "../../../components/Shared/Map.css";

const BusinessInfoMap = (props) => {
  const mapRef = useRef();
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  

  const [coordinates, setCoordinates] = useState({
    latitude: props.coordinates.latitude ?? 0,
    longitude: props.coordinates.longitude ?? 0,
  });

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.google && window.google.maps && !mapLoaded) {
        // Initialize the map
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: coordinates.latitude, lng: coordinates.longitude },
          zoom: 13,
        });

        // Set the marker and circle
        markerRef.current = new window.google.maps.Marker({
          position: { lat: coordinates.latitude, lng: coordinates.longitude },
          map: map,
        });
        circleRef.current = new window.google.maps.Circle({
          map: map,
          center: { lat: coordinates.latitude, lng: coordinates.longitude },
          radius: props.radius ?? 0,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 1,
        });

        // Mark map as loaded
        setMapLoaded(true);
      }
    }, 100); // Try every 3 seconds

    // Clear interval when map has loaded
    if (mapLoaded) {
      clearInterval(intervalId);
    }

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [coordinates, mapLoaded]);

  return <div ref={mapRef} className="map"></div>;
};

export default BusinessInfoMap;
