export type IColor = 'green' | 'blue' | 'red' | 'yellow'

export type ICoordinate = {
  lat: number
  lon: number
}
export type IMarker = {
  id: string
  color: IColor
  latLon: ICoordinate
}

export type ITimeseries = {
  marker: IMarker
  data: {
    midDateArray: Date[]
    velocityArray: number[]
  }
}

type IGlacier = {
  name: string
  coordinates: Array<ICoordinate>
  zoomLevel: number
}
type IRegion = string

export const glaciersDict: Record<IRegion, Array<IGlacier>> = {
  'Alaska': [
    {
      name: 'Malaspina Glacier',
      coordinates: [
        { lat: 60.176, lon: -147.722 },
      ],
      zoomLevel: 10
    },
    {
      name: 'Columbia Glacier',
      coordinates: [
        { lat: 60.176, lon: -147.722 },
        { lat: 60.176, lon: -147.722 },
        { lat: 60.176, lon: -147.722 },
      ],
      zoomLevel: 10

    },
    {
      name: 'Mendenhall Glacier',
      coordinates: [
        { lat: 58.435, lon: -134.554 },
        { lat: 58.435, lon: -134.554 },
        { lat: 58.435, lon: -134.554 },
      ],
      zoomLevel: 10
    }
  ],
  'Washington': [
    {
      name: 'South Cascade Glacier',
      coordinates: [
        { lat: 48.5, lon: -121.0 },
      ],
      zoomLevel: 10
    },
  ],

}