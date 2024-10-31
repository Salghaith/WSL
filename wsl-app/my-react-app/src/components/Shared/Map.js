import React, { useRef, useEffect } from "react";
import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
    new window.google.maps.Circle({
      map: map,
      center: center,
      radius: 100,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 1,
    });
  }, [center, zoom]);

  return <div ref={mapRef} className="map"></div>;
};
export default Map;
