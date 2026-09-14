import { useState } from "react";
import MapGL, {
  NavigationControl
} from "react-map-gl/maplibre";

import { useYjsDoc } from "./hooks/useYjsDoc";

import "maplibre-gl/dist/maplibre-gl.css";

const INITIAL_VIEW = {
  longitude: -122.4194,
  latitude: 37.7749,
  zoom: 11
};

export default function App() {
  const [roomId, setRoomId] = useState("demo-room");

  const yjs = useYjsDoc(roomId);

  const connected = yjs?.connected === true;

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>MapTogether</h1>

        <p>
          Collaborative open-source mapping.
        </p>

        <label>
          Room
        </label>

        <input
          value={roomId}
          onChange={(event) =>
            setRoomId(event.target.value)
          }
        />

        <div className="status">
          {connected
            ? "🟢 Collaboration connected"
            : "🟡 Connecting to collaboration server..."}
        </div>
      </aside>

      <main className="map">
        <MapGL
          initialViewState={INITIAL_VIEW}
          mapStyle="https://demotiles.maplibre.org/style.json"
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <NavigationControl />
        </MapGL>
      </main>
    </div>
  );
}