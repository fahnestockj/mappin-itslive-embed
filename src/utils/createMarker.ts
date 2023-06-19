import { createId } from "@paralleldrive/cuid2"
import produce from "immer"
import { getColor } from "./getColor"
import { IMarker } from "../types"

type IProps = {
  latitude: number
  longitude: number
  markers: IMarker[]
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>

}
export function createMarker(props: IProps) {
  const { latitude, longitude, markers, setMarkers } = props

  if (markers.length < 4) {
    const color = getColor(markers.length)


    //Immer produce for immutability
    const updatedMarkers = produce(markers, draft => {
      draft.push({
        id: createId(),
        color,
        latLon: {
          lat: parseFloat(latitude.toFixed(5)),
          lon: parseFloat(longitude.toFixed(5))
        }
      })
    })
    setMarkers(updatedMarkers)
  }
}