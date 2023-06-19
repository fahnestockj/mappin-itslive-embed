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
          id: 'm1Columbia',
          color: 'blue',
          latLon: { lat: 60.27524, lon: -148.43079 },
        },
        {
          id: 'm2Columbia',
          color: 'red',
          latLon: { lat: 60.27388, lon: -148.51387 },
        },
        {
          id: 'm33Columbia',
          color: 'yellow',
          latLon: { lat: 60.26025, lon: -148.56056 },
        }
      ],

      zoomLevel: 10,
      center: { lat: 60.28000, lon: -148.49396 }
    },
  ],
  'Washington': [
    {
      name: 'South Cascade Glacier',
      markers: [
        {
          id: 'mk1SouthCascade',
          color: 'blue',
          latLon: { lat: 48.36, lon: -121.0575 },
        }
      ],
      zoomLevel: 14,
      center: { lat: 48.36, lon: -121.0575 },
    },
  ],
  'Greenland': [
    {
      name: 'Jakobshavn Glacier',
      markers: [
        {
          id: 'mk1JakobshavnGlacier',
          color: 'blue',
          latLon: { lat: 69.1488, lon: -49.5903 },
        },

        {
          id: 'mk2JakobshavnGlacier',
          color: 'green',
          latLon: { lat: 69.16060, lon: -49.51263 },
        },
      ],
      zoomLevel: 10,
      center: { lat: 69.16060, lon: -49.51263 },
    },
  ]
}