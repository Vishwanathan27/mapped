'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, TrafficLayer } from '@react-google-maps/api';
import { FaCar, FaTrafficLight, FaExclamationTriangle } from 'react-icons/fa';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 12.9716, // Default to Bangalore
  lng: 77.5946
};

export default function Home() {
  const [trafficData, setTrafficData] = useState({
    congestion: 0,
    incidents: 0,
    averageSpeed: 0
  });

  const [selectedLocation, setSelectedLocation] = useState('Bangalore');

  const locations = [
    { name: 'Bangalore', coordinates: { lat: 12.9716, lng: 77.5946 } },
    { name: 'Mumbai', coordinates: { lat: 19.0760, lng: 72.8777 } },
    { name: 'Delhi', coordinates: { lat: 28.7041, lng: 77.1025 } }
  ];

  useEffect(() => {
    // Simulate traffic data updates
    const interval = setInterval(() => {
      setTrafficData({
        congestion: Math.floor(Math.random() * 100),
        incidents: Math.floor(Math.random() * 10),
        averageSpeed: Math.floor(Math.random() * 60)
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Live Traffic Tracker</h1>
      </div>
      
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/4 bg-gray-100 p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Location</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <FaTrafficLight className="text-red-500 mr-2" />
                <h3 className="font-semibold">Traffic Congestion</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{trafficData.congestion}%</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-yellow-500 mr-2" />
                <h3 className="font-semibold">Traffic Incidents</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{trafficData.incidents}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <FaCar className="text-blue-500 mr-2" />
                <h3 className="font-semibold">Average Speed</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{trafficData.averageSpeed} km/h</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              <TrafficLayer />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </main>
  );
}
