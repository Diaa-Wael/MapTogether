export function yMapToFeature(value) {
  if (!value) return null;

  return {
    type: "Feature",
    id: value.id,
    geometry: value.geometry,
    properties: value.properties || {}
  };
}

export function yjsFeaturesToGeoJSON(featuresMap) {
  const features = [];

  featuresMap.forEach((value) => {
    const feature = yMapToFeature(value);

    if (feature) {
      features.push(feature);
    }
  });

  return {
    type: "FeatureCollection",
    features
  };
}