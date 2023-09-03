import { useMapEvents } from "react-leaflet"
import { createMarker } from "../utils/createMarker";
import { IMarker } from "../types";

type IProps = {
  markers: Array<IMarker>
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>
  setVelMosaicChecked: React.Dispatch<React.SetStateAction<boolean>>
}
const MapEventController = (props: IProps) => {

  const { markers, setMarkers, setVelMosaicChecked } = props
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
        setVelMosaicChecked(true)
      }
    },
    layerremove(e) {
      //@ts-ignore
      if (e.layer._url === 'https://glacierflow.nyc3.digitaloceanspaces.com/webmaps/vel_map/{z}/{x}/{y}.png') {
        setVelMosaicChecked(false)
      }
    },
  })

  return null
}

export default MapEventController