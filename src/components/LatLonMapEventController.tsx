import { useMapEvents } from "react-leaflet"
import { createMarker } from "../utils/createMarker";
import { IMarker } from "./Velmap";

type IProps = {
  markers: Array<IMarker>
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>
}
const LatLonMapEventController = (props: IProps) => {
  const { markers, setMarkers } = props
  useMapEvents({
    click(e) {
      createMarker({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        markers,
        setMarkers,
      })

    }
  })

  return null
}

export default LatLonMapEventController