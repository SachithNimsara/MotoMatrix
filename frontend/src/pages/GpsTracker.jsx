import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define the custom icon
const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const GpsTracker = () => {
  const [location, setLocation] = useState({ LAT: null, LNG: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const locationRef = ref(database, 'gps_location');

    // Listen for changes to the data
    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const latestLocation = {
          LAT: data.LAT,
          LNG: data.LNG
        };
        setLocation(latestLocation);
      } else {
        setError('No location data available.');
      }
    }, (error) => {
      setError(error.message); // Handle any Firebase read errors
    });
  }, []);

  // Determine the center of the map based on the location
  const mapCenter = location.LAT && location.LNG ? [location.LAT, location.LNG] : [0, 0];

  return (
    <div>
      <style>
        {`
          html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          .map-container {
            height: 100vh;
            width: 100vw;
          }
            h1{
            color:blue;
             font-weight: 500;
              font-size: 1em;
            }
        `}
      </style>
      <h1>GPS Tracker / Latitude: {location.LAT} /Longitude: {location.LNG}</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="map-container">
          {location.LAT && location.LNG && (
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={mapCenter} icon={redIcon}>
                <Popup>Your current location</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      )}
    </div>
  );
};

export default GpsTracker;
