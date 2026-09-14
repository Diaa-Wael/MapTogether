export const FEATURE_TYPES = {
  POINT: "Point",
  LINE_STRING: "LineString",
  POLYGON: "Polygon"
};

export function createFeature({
  id,
  geometry,
  properties = {},
  createdBy = null
}) {
  const now = new Date().toISOString();

  return {
    id,
    geometry,
    properties,
    meta: {
      createdBy,
      createdAt: now,
      updatedAt: now
    }
  };
}

export function isValidGeometry(geometry) {
  if (!geometry || typeof geometry !== "object") {
    return false;
  }

  if (!FEATURE_TYPES[geometry.type?.toUpperCase()]) {
    return false;
  }

  if (!Array.isArray(geometry.coordinates)) {
    return false;
  }

  return true;
}

export function featureToGeoJSON(feature) {
  return {
    type: "Feature",
    id: feature.id,
    geometry: feature.geometry,
    properties: {
      ...feature.properties,
      ...feature.meta
    }
  };
}