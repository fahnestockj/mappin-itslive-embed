import { useMapEvents } from "react-leaflet"
import { createMarker } from "../utils/createMarker";
import { ICoordinate, IMarker } from "../types";
import { useCallback, useState } from "react";

type IProps = {
  markers: Array<IMarker>
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>
}
const LatLonMapEventController = (props: IProps) => {
  const [mosaicLayerHidden, setMosaicLayerHidden] = useState<boolean>(false)

  const { markers, setMarkers } = props
  useMapEvents({
    click(e) {
      createMarker({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        markers,
        setMarkers,
      })
    },

    layeradd(e) {
      //@ts-ignore
      if (e.layer._url === 'https://glacierflow.nyc3.digitaloceanspaces.com/webmaps/vel_map/{z}/{x}/{y}.png') {
        setMosaicLayerHidden(false)
      }
    },
    layerremove(e) {
      //@ts-ignore
      if (e.layer._url === 'https://glacierflow.nyc3.digitaloceanspaces.com/webmaps/vel_map/{z}/{x}/{y}.png') {
        setMosaicLayerHidden(true)
      }
    },
  })

  return null
}

export default LatLonMapEventController