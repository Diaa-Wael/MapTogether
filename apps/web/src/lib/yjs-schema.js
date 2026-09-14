import * as Y from "yjs";
import { YJS_MAPS } from "@maptogether/shared/constants";

export function createMapDocument() {
  const doc = new Y.Doc();

  doc.getMap(YJS_MAPS.FEATURES);
  doc.getMap(YJS_MAPS.LAYERS);
  doc.getMap(YJS_MAPS.METADATA);

  return doc;
}

export function getFeaturesMap(doc) {
  return doc.getMap(YJS_MAPS.FEATURES);
}

export function getLayersMap(doc) {
  return doc.getMap(YJS_MAPS.LAYERS);
}

export function getMetadataMap(doc) {
  return doc.getMap(YJS_MAPS.METADATA);
}