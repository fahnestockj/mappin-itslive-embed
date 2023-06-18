import { useState, useRef, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import L from 'leaflet'
import { SvgCross } from '../SvgCross'
import './LocationMarker.css'
import { IMarker } from '../../types'

type IProps = {
  markerProp: IMarker
  markers: Array<IMarker>
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>
}
const LocationMarker = (props: IProps) => {
  const { markerProp, markers, setMarkers } = props
  const markerRef = useRef(null)
  const [position, setPosition] = useState({ lat: markerProp.latLon.lat, lng: markerProp.latLon.lon })


  useEffect(() => {
    //useEffect check if markerProp.latLon is different from marker.latLon
    //if so, update marker.latLon
    //if not, do nothing
    //we need this because the markerProp.latLon is updated by the LatLonMapEventController but this component is not rerendered
    if (markerProp.latLon.lat !== position.lat || markerProp.latLon.lon !== position.lng) {
      setPosition({ lat: markerProp.latLon.lat, lng: markerProp.latLon.lon })
    }
  })

  const icon = L.divIcon({
    html: renderToStaticMarkup(SvgCross(markerProp.color)),
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, 0],
    shadowAnchor: [13, 28],
    className: 'transparent'
  })

  const eventHandlers = {
    dragend() {
      const oldMarkerIndex = markers.findIndex(marker => marker.id === markerProp.id)
      const marker = markerRef.current
      if (marker != null) {
        const newMarkers = [...markers]
        //@ts-ignore
        const { lat, lng } = marker.getLatLng() as { lat: number, lng: number } //a leaflet function for fetching latLon
        newMarkers[oldMarkerIndex] = {
          ...markerProp,
          latLon: {
            lat: parseFloat(lat.toFixed(5)),
            lon: parseFloat(lng.toFixed(5))
          }
        }
        setMarkers(newMarkers)
        //@ts-ignore
        setPosition(marker.getLatLng())
      }
    }
  }
  return (
    <Marker position={position}
      draggable={true}
      eventHandlers={eventHandlers}
      ref={markerRef}
      icon={icon}
    >
      <Popup>Lat: {position.lat.toFixed(5)} Long: {position.lng.toFixed(5)}</Popup>
    </Marker>
  )
}



export default LocationMarker
