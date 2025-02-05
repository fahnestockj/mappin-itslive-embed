import { useState, useRef, useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import { SvgCross } from "../SvgCross";
import "./LocationMarker.css";
import { ICoordinate, IMarker } from "../../types";
import { createId } from "@paralleldrive/cuid2";

type IProps = {
  markerProp: IMarker;
  markers: Array<IMarker>;
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>;
};

const LocationMarker = (props: IProps) => {
  const { markerProp, markers, setMarkers } = props;
  const markerRef = useRef(null);
  const [position, setPosition] = useState<ICoordinate>(markerProp.latLon);
  const icon = L.divIcon({
    html: renderToStaticMarkup(SvgCross(markerProp.color)),
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, 0],
    shadowAnchor: [13, 28],
    className: "transparent",
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const oldMarkerIndex = markers.findIndex(
          (marker) => marker.id === markerProp.id
        );
        const marker = markerRef.current;
        if (marker != null) {
          const newMarkers = markers.slice()
          // @ts-ignore
          const { lat, lng: lon } = marker.getLatLng() as {
            lat: number;
            lng: number;
          };
          newMarkers[oldMarkerIndex] = {
            id: createId(),
            color: markerProp.color,
            latLon: {
              lat: parseFloat(lat.toFixed(4)),
              lon: parseFloat(lon.toFixed(4)),
            },
          };
          setPosition({ lat, lon });
          setMarkers(newMarkers);
        }
      },
    }),
    [markerProp, markers, setMarkers]
  );
  return (
    <Marker
      position={{ lat: position.lat, lng: position.lon }}
      draggable={true}
      eventHandlers={eventHandlers}
      ref={markerRef}
      icon={icon}
    >
      <Popup>
        Lat: {position.lat.toFixed(4)} Long: {position.lon.toFixed(4)}
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
