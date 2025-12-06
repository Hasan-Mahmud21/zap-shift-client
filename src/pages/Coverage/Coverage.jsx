import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

// Component to trigger flyTo animation
const FlyToLocation = ({ position }) => {
  const map = useMap();

  if (position) {
    map.flyTo(position, 10, {
      animate: true,
      duration: 2, // smooth 2-second animation
    });
  }

  return null;
};

const Coverage = () => {
  const position = [23.685, 90.3563]; // Default BD center
  const serviceCenters = useLoaderData();

  const [searchText, setSearchText] = useState("");
  const [flyPosition, setFlyPosition] = useState(null);
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [noResult, setNoResult] = useState(false);

  // Handle Search
  const handleSearch = () => {
    const match = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (match) {
      setFlyPosition([match.latitude, match.longitude]);
      setActiveMarkerId(match.id);
      setNoResult(false);
    } else {
      setNoResult(true);
      setFlyPosition(null);
      setActiveMarkerId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          We Are Available in All 64 Districts
        </h2>
        <p className="text-base-content/60 mt-2">
          Explore district-wise coverage & service areas.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-center gap-3 mb-5">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full md:w-1/3 rounded-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="btn btn-primary rounded-full px-6"
        >
          Search
        </button>
      </div>

      {noResult && (
        <p className="text-center text-error font-semibold mb-3">
          No district found.
        </p>
      )}

      {/* Map Wrapper */}
      <div className="bg-base-100 rounded-3xl shadow-xl border border-base-200 overflow-hidden">
        <div className="h-[600px] w-full relative">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            {/* FlyTo animation component */}
            <FlyToLocation position={flyPosition} />

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Markers */}
            {serviceCenters.map((center) => (
              <Marker
                key={center.id}
                position={[center.latitude, center.longitude]}
                eventHandlers={{
                  add: (marker) => {
                    // Auto-open popup if this is the searched marker
                    if (activeMarkerId === center.id) {
                      setTimeout(() => {
                        marker.target.openPopup();
                      }, 2000); // Wait for fly animation
                    }
                  },
                }}
              >
                <Popup>
                  <strong className="text-primary">{center.district}</strong>
                  <br />
                  Coverage: {center.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
