import { useEffect, useRef, useState } from "react";
import "../../../components/Shared/Map.css";

const BusinessInfoMap = (props) => {
  const mapRef = useRef();
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  if (!props) {
    return <p>No Data to display</p>;
  }

  const [coordinates, setCoordinates] = useState({
    latitude: props.coordinates.latitude,
    longitude: props.coordinates.longitude,
  });

  useEffect(() => {
    // Initialize the map
    const map = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      },
      zoom: 13,
    });

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
  }, [coordinates]);

  return <div ref={mapRef} className="map"></div>;
};

export default BusinessInfoMap;
