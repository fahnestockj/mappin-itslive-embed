import { createId } from "@paralleldrive/cuid2"
import produce from "immer"
import { IColor, IMarker } from "../types"

type IProps = {
  latitude: number
  longitude: number
  markers: IMarker[]
  setMarkers: React.Dispatch<React.SetStateAction<IMarker[]>>

}
export function createMarker(props: IProps) {
  const { latitude, longitude, markers, setMarkers } = props

  if (markers.length < 4) {
    //Immer produce for immutability
    const updatedMarkers = produce(markers, draft => {
      draft.push({
        id: createId(),
        color: getColor(markers.length),
        latLon: {
          lat: parseFloat(latitude.toFixed(5)),
          lon: parseFloat(longitude.toFixed(5))
        }
      })
    })

    setMarkers(updatedMarkers)
  }
}
export const getColor = (num: number): IColor => {
  switch (num) {
    case 0:
      return 'll'
    case 1:
      return 'cpg'
    case 2:
      return 'reb'
    case 3:
      return 'c'
    default:
      return 'dg'
  }
}