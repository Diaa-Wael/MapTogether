import MapGL, {
  NavigationControl,
  Source,
  Layer
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

const INITIAL_VIEW = {
  longitude: -122.4194,
  latitude: 37.7749,
  zoom: 11
};

const featureLayer = {
  id: "features",
  type: "circle",
  paint: {
    "circle-radius": 7,
    "circle-color": "#2563eb",
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff"
  }
};

export default function Map({
  geojson,
  onMapClick
}) {
  return (
    <MapGL
      initialViewState={INITIAL_VIEW}
      mapStyle="https://demotiles.maplibre.org/style.json"
      style={{
        width: "100%",
        height: "100%"
      }}
      onClick={onMapClick}
    >
      <NavigationControl />

      <Source
        id="features"
        type="geojson"
        data={geojson}
      >
        <Layer {...featureLayer} />
      </Source>
    </MapGL>
  );
}