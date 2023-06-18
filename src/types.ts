import { markersInit } from "./components/ChartPlotly/mockMarkers"

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

export type IGlacier = {
  name: string
  markers: Array<IMarker>
  zoomLevel: number
  center: ICoordinate
}
export type IRegion = string

export const glaciersDict: Record<IRegion, Array<IGlacier>> = {
  'Alaska': [
    {
      name: 'Malaspina Glacier',
      markers: markersInit,
      zoomLevel: 9,
      center: { lat: 59.99426, lon: -140.58929 }
    },
    {
      name: 'Columbia Glacier',
      markers: [
        {
          id: 'Columbia Glacier',
          color: 'blue',
          latLon: { lat: 60.176, lon: -147.722 },
        }
      ],
      zoomLevel: 10,
      center: { lat: 60.176, lon: -147.722 }

    },
    {
      name: 'Mendenhall Glacier',
      markers: [
        {
          id: 'Mendenhall Glacier',
          color: 'blue',
          latLon: { lat: 58.435, lon: -134.554 },
        }
      ],
      zoomLevel: 10,
      center: { lat: 58.435, lon: -134.554 }
    }
  ],
  'Washington': [
    {
      name: 'South Cascade Glacier',
      markers: [
        {
          id: 'South Cascade Glacier',
          color: 'blue',
          latLon: { lat: 48.5, lon: -121.0 },
        }
      ],
      zoomLevel: 10,
      center: { lat: 48.5, lon: -121.0 }
    },
  ],

}