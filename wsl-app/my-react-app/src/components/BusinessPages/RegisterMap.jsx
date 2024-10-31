import { useEffect, useRef, useState } from "react";
import "../Shared/Map.css";

const RegisterMap = (props) => {
  const mapRef = useRef();
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  const [coordinates, setCoordinates] = useState(props.coords);

  useEffect(() => {
    // Initialize the map
    const map = new window.google.maps.Map(mapRef.current, {
      center: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
      zoom: 13,
    });

    markerRef.current = new window.google.maps.Marker({
      position: coordinates,
      map: map,
    });
    circleRef.current = new window.google.maps.Circle({
      map: map,
      center: coordinates,
      radius: props.radius,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 1,
    });

    // Add a click listener to the map
    map.addListener("click", (event) => {
      const clickedLocation = event.latLng;

      setCoordinates({
        lat: clickedLocation.lat(),
        lng: clickedLocation.lng(),
      });
      props.onChangeMap(clickedLocation.lat(), clickedLocation.lng());
    });
  }, []);

  useEffect(() => {
    if (markerRef.current && circleRef.current) {
      // Update marker and circle
      markerRef.current.setPosition(coordinates);
      circleRef.current.setCenter(coordinates);
      circleRef.current.setRadius(props.radius);
    }
  }, [coordinates, props.radius]);

  return <div ref={mapRef} className="map"></div>;
};

export default RegisterMap;
