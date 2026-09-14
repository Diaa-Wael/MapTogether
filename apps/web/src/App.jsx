import { useMemo, useState } from "react";

import Map from "./components/Map";
import DrawTools from "./components/DrawTools";
import { useYjsDoc } from "./hooks/useYjsDoc";
import {
  yjsFeaturesToGeoJSON
} from "./lib/geojson-utils";

export default function App() {
  const [roomId, setRoomId] = useState("demo-room");
  const [mode, setMode] = useState("select");

  const yjs = useYjsDoc(roomId);

  const geojson = useMemo(() => {
    if (!yjs?.doc) {
      return {
        type: "FeatureCollection",
        features: []
      };
    }

    const features = yjs.doc.getMap("features");

    return yjsFeaturesToGeoJSON(features);
  }, [yjs]);

  function handleMapClick(event) {
    if (!yjs?.doc) return;
    if (mode !== "point") return;

    const features = yjs.doc.getMap("features");

    const id = crypto.randomUUID();

    features.set(id, {
      id,

      geometry: {
        type: "Point",
        coordinates: [
          event.lngLat.lng,
          event.lngLat.lat
        ]
      },

      properties: {
        name: "New point"
      },

      meta: {
        createdAt: new Date().toISOString()
      }
    });
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>MapTogether</h1>

        <input
          value={roomId}
          onChange={(event) =>
            setRoomId(event.target.value)
          }
          placeholder="Room ID"
        />

        <DrawTools
          mode={mode}
          setMode={setMode}
        />
      </aside>

      <main className="map-container">
        <Map
          geojson={geojson}
          onMapClick={handleMapClick}
        />
      </main>
    </div>
  );
}