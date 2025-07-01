"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Card } from "@/components/ui/card";

// Fix Leaflet marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Categorized Locations
const gates = [
  { name: "Gate 1", lat: 30.517916, lng: 76.659177 },
  { name: "Gate 2", lat: 30.517433, lng: 76.658367 },
  { name: "Gate 3", lat: 30.516912, lng: 76.657561 },
  { name: "Gate 4", lat: 30.515892, lng: 76.658961 }
];

const parking = [
  { name: "Tesla Parking", lat: 30.516499, lng: 76.657238 },
  { name: "New Faculty Parking", lat: 30.516876, lng: 76.660484 },
  {name:"Pkl Bus Parking",lat:30.514524,lng:76.659670},
  {name:"Zero Ground Parking",lat:30.516639,lng:76.658598},
  {name:"Ambala Chd Bus Parking",lat:30.517584,lng:76.659933}
];

const sports = [
  { name: "Sportorium", lat: 30.515864, lng: 76.657824 },
  { name: "Zero Ground", lat: 30.516645, lng: 76.657649 },
  { name: "VolleyBall Court", lat: 30.515984, lng: 76.658633 },
  { name: "BasketBall Court", lat: 30.515990, lng: 76.658105 },
  {name:"Omega Zone",lat:30.515361,lng:76.660323}, 
  {name:"Zero Ground",lat:30.516645,lng:76.657649},
  {name:"Alpha Zone",lat:30.516676,lng:76.660025}, 
  {name:"Beta Zone",lat:30.515742,lng:76.659532},  

];

const adminBlocks = [
  { name: "Admission Block", lat: 30.517653, lng: 76.659038 },
  { name: "Library", lat: 30.515788, lng: 76.660465 },
  { name: "Dispensary", lat: 30.515994, lng: 76.660304 },
  {name:"Babbage Block",lat:30.517444,lng:76.660024},
  {name:"Explore Hub",lat:30.515327,lng:76.659354}, 
];

const studyBlocks = [
  { name: "Turing Block", lat: 30.51653, lng: 76.660486 },
  { name: "Galileo Block", lat: 30.515676, lng: 76.659191 },
  { name: "Fleming Block", lat: 30.515532, lng: 76.661031 },
  { name: "Picasso Block", lat: 30.517251, lng: 76.65898 },
  { name: "Tesla Block", lat: 30.515893, lng: 76.656485 },
  { name: "Newton Block", lat: 30.516422, lng: 76.659457 },
  {name:"Rockfeller Block",lat:30.514265,lng:76.660147},
  {name:"Pythagoras Block",lat:30.515121,lng:76.659217},   
  {name:"Le Corbusier Block",lat:30.517190,lng:76.660265},  
  {name:"Edison Block",lat:30.516417,lng:76.659732}, 
  {name:"Hospitality Block",lat:30.514844,lng:76.659526}, 
];

export default function CollegeMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState([]);

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  // Fetch route when destination is selected
  useEffect(() => {
    if (currentLocation && destination) {
      getRoute(currentLocation, [destination.lat, destination.lng]);
    }
  }, [currentLocation, destination]);

  // Function to fetch the path from ORS API
  async function getRoute(start, end) {
    console.log("Fetching route from", start, "to", end);
    const ORS_API_KEY = "5b3ce3597851110001cf6248869030284c3d416ab457267e3af04c3a";
    const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${ORS_API_KEY}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;

    try {
      const response = await axios.get(url);
      console.log("API Response:", response.data);

      if (response.data.features && response.data.features.length > 0) {
        const geometry = response.data.features[0].geometry;
        if (geometry && geometry.type === "LineString") {
          const coordinates = geometry.coordinates.map(coord => [coord[1], coord[0]]);
          console.log("Extracted Route Coordinates:", coordinates);
          setRoute(coordinates);
        } else {
          console.error("Invalid geometry format in API response:", geometry);
        }
      } else {
        console.error("No valid route found in response.");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  }

  // Function to handle dropdown selection
  const handleSelect = (e, category) => {
    const selected = category.find((loc) => loc.name === e.target.value);
    setDestination(selected);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Card Wrapper for Themed Dropdowns */}
      <Card className="bg-zinc-900 border-zinc-800 p-4 w-full">
        <h2 className="text-white text-xl font-semibold mb-3">Select a Destination</h2>

        {/* Dropdowns for Different Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <select className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-700"
            onChange={(e) => handleSelect(e, gates)}>
            <option value="">Gates</option>
            {gates.map((loc, index) => <option key={index} value={loc.name}>{loc.name}</option>)}
          </select>

          <select className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-700"
            onChange={(e) => handleSelect(e, parking)}>
            <option value="">Parking</option>
            {parking.map((loc, index) => <option key={index} value={loc.name}>{loc.name}</option>)}
          </select>

          <select className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-700"
            onChange={(e) => handleSelect(e, sports)}>
            <option value="">Sports and Grounds</option>
            {sports.map((loc, index) => <option key={index} value={loc.name}>{loc.name}</option>)}
          </select>

          <select className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-700"
            onChange={(e) => handleSelect(e, adminBlocks)}>
            <option value="">Admin Blocks</option>
            {adminBlocks.map((loc, index) => <option key={index} value={loc.name}>{loc.name}</option>)}
          </select>

          <select className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md border border-zinc-700"
            onChange={(e) => handleSelect(e, studyBlocks)}>
            <option value="">Study Blocks</option>
            {studyBlocks.map((loc, index) => <option key={index} value={loc.name}>{loc.name}</option>)}
          </select>
        </div>
      </Card>

      {/* Map Container */}
      <Card className="bg-zinc-900 border-zinc-800 p-2 w-full">
        <MapContainer center={[30.51653, 76.660486]} zoom={16} style={{ height: "500px", width: "100%", borderRadius: "10px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {currentLocation && <Marker position={currentLocation} icon={customIcon}><Popup>You are here</Popup></Marker>}
          {destination && <Marker position={[destination.lat, destination.lng]} icon={customIcon}><Popup>{destination.name}</Popup></Marker>}
          {route.length > 0 && <Polyline positions={route} color="#34D360" weight={4} />}
        </MapContainer>
      </Card>
    </div>
  );
}
